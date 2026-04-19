import React, { useState, useEffect } from "react"
import CountUp from 'react-countup';

const SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlrrjhFol-JKW1pdwdy4b9ptBO98FWBuUyKyWcnG4Zl8lAfcRCLIyI6aiBA8dyKFUsG66g3TwmbTJ4/pub?output=csv&gid=0";

/**
 * Parse a single CSV line, handling quoted fields that may contain commas.
 * Returns an array of string values.
 */
function parseCSVLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped double-quote inside quoted field
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

/**
 * Parse CSV text where:
 *   Row 1  — sheet title (skip)
 *   Row 2  — column headers
 *   Row 3+ — data rows
 * Returns an array of objects keyed by header name.
 */
function parseCSV(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length < 3) return [];

  // Row index 1 (0-based) = row 2 = headers
  const headers = parseCSVLine(lines[1]);

  const rows = [];
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = (values[idx] || "").trim();
    });
    rows.push(obj);
  }
  return rows;
}

const countUpProps = {
  duration: 2,
  delay: 0.5,
  enableScrollSpy: true,
};

/**
 * Timezone-safe date parser for M/D/YYYY strings from the sheet.
 * Using the Date constructor directly with locale strings can shift the date
 * by a day due to UTC vs local time conversion.
 */
const parseFlightDate = (str) => {
  const [m, d, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d);
};

/**
 * Compute all stats needed from the parsed flight rows.
 */
function computeStats(allRows) {
  // Filter out rows without a date, an unparseable date, or missing total time
  const flights = allRows.filter((r) => {
    if (!r['Date'] || !r['Total Time'] || r['Total Time'] === '') return false;
    return !isNaN(parseFlightDate(r['Date']));
  });

  const now = new Date();
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

  let totalTime = 0;
  let lastYearTime = 0;
  let lastYearCount = 0;
  const typeMap = {};

  flights.forEach((row) => {
    const hours = parseFloat(row['Total Time']) || 0;
    totalTime += hours;

    const flightDate = parseFlightDate(row['Date']);
    if (flightDate >= twelveMonthsAgo) {
      lastYearTime += hours;
      lastYearCount++;
    }

    const model = (row['Make and Model'] || 'Unknown').trim();
    typeMap[model] = (typeMap[model] || 0) + hours;
  });

  // Sort by hours descending
  const byType = Object.entries(typeMap).sort((a, b) => b[1] - a[1]);

  const recentFlights = [...flights].reverse().slice(0, 50);

  return {
    totalTime: Math.round(totalTime * 10) / 10,
    totalFlights: flights.length,
    byType,
    lastYearTime: Math.round(lastYearTime * 10) / 10,
    lastYearCount,
    recentFlights,
  };
}

const Flying = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(SHEETS_CSV_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        setStats(computeStats(parseCSV(text)));
        setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Failed to fetch flight data:', err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <section id="flying">
      <div id="flying_container">
        {loading && (
          <p className="flying-loading">Loading flight data...</p>
        )}

        {error && (
          <p className="flying-error">Flight stats temporarily unavailable.</p>
        )}

        {!loading && !error && stats && (
          <div className="flying-stats">
            {/* Overall Stats */}
            <h1 className="flying-header">Overall Stats</h1>
            <div className="quick-stats">
              <div className="plane-type-stats">
                Total Hours:&nbsp;
                <CountUp
                  {...countUpProps}
                  end={stats.totalTime}
                  decimals={1}
                />
              </div>
              <div className="plane-type-stats">
                Total Flights:&nbsp;
                <CountUp
                  {...countUpProps}
                  end={stats.totalFlights}
                  decimals={0}
                />
              </div>
            </div>

            <h2 className="flying-header">Hours by Aircraft Type</h2>
            <div className="quick-stats">
              {stats.byType.map(([model, hours]) => (
                <div className="plane-type-stats" key={model}>
                  {model}:&nbsp;
                  <CountUp
                    {...countUpProps}
                    end={hours}
                    decimals={1}
                  />
                </div>
              ))}
            </div>

            {/* Last 12 Months */}
            <h1 className="flying-header">Last 12 Months</h1>
            <div className="quick-stats">
              <div className="plane-type-stats">
                Hours:&nbsp;
                <CountUp
                  {...countUpProps}
                  end={stats.lastYearTime}
                  decimals={1}
                />
              </div>
              <div className="plane-type-stats">
                Flights:&nbsp;
                <CountUp
                  {...countUpProps}
                  end={stats.lastYearCount}
                  decimals={0}
                />
              </div>
            </div>

            {/* Recent Flights Table */}
            <h1 className="flying-header">Recent Flights</h1>
            <div className="recent-flights-table-wrapper">
              <table className="recent-flights-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Aircraft</th>
                    <th>Route</th>
                    <th>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentFlights.map((row, idx) => {
                    const from = row['From'] || '';
                    const to = row['To'] || '';
                    const intermediate = row['Intermediate'] || '';
                    const route = intermediate
                      ? `${from} → ${intermediate} → ${to}`
                      : `${from} → ${to}`;
                    return (
                      <tr key={`${idx}-${row['Date']}-${row['From']}-${row['To']}`}>
                        <td>{row['Date']}</td>
                        <td>{row['Make and Model']}</td>
                        <td>{route}</td>
                        <td>{row['Total Time']}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Flying;
