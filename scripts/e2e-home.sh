#!/usr/bin/env bash
# End-to-end checks for the redesigned home page sections.
# Usage: pnpm dev (in another terminal), then: bash scripts/e2e-home.sh [base-url]
set -uo pipefail

BASE_URL="${1:-http://localhost:3000}"
FAILURES=0

evaluate() { agent-browser eval "$1" 2>/dev/null | tail -1 | tr -d '"'; }

visit() {
  agent-browser open "${BASE_URL}$1" >/dev/null 2>&1
  agent-browser wait 2500 >/dev/null 2>&1
}

expect() {
  local description="$1" expected="$2" actual="$3"
  if [ "$actual" = "$expected" ]; then
    echo "PASS  $description"
  else
    echo "FAIL  $description (expected '$expected', got '$actual')"
    FAILURES=$((FAILURES + 1))
  fi
}

count() { evaluate "document.querySelectorAll('$1').length"; }
click() { evaluate "(() => { document.querySelector('$1').click(); return 'clicked'; })()" >/dev/null; agent-browser wait 1500 >/dev/null 2>&1; }
path() { evaluate "location.pathname"; }
has_scroll() { evaluate "document.documentElement.scrollWidth > innerWidth"; }
banner_colour() { evaluate "getComputedStyle(document.querySelector('main section')).backgroundColor"; }

check_home_sections() {
  expect "$1: four strength cards" "5" "$(count '#strengths .strength-card-item')" # four cards + photo
  expect "$1: three service cards" "3" "$(count '#services .service-card-item')"
  expect "$1: eight product tiles" "8" "$(count '#products .product-rail-item')"
  expect "$1: ten sourcing pills" "10" "$(count '#sourcing .sourcing-country-pill')"
  expect "$1: four quality cards" "4" "$(count '#quality .quality-card-item')"
  expect "$1: no horizontal scroll" "false" "$(has_scroll)"
}

agent-browser set viewport 1440 900 >/dev/null 2>&1
visit /
check_home_sections "desktop"

click '#quality button[aria-label*="HACCP"]'
expect "HACCP pill opens the certificate viewer" "1" "$(count '[role="dialog"]')"
agent-browser press Escape >/dev/null 2>&1
agent-browser wait 800 >/dev/null 2>&1
expect "Escape closes the certificate viewer" "0" "$(count '[role="dialog"]')"

click '#services a[href="/services"]'
expect "All Services opens /services" "/services" "$(path)"
visit /
click '#products a[href="/products/fruits"]'
expect "Fresh Fruits rail opens its category" "/products/fruits" "$(path)"
visit /
click '#quality a[href="/quality"]'
expect "Our Quality Process opens /quality" "/quality" "$(path)"

visit /ar
expect "Arabic home is right-to-left" "rtl" "$(evaluate "getComputedStyle(document.querySelector('#products')).direction")"
check_home_sections "arabic"

agent-browser set viewport 375 800 >/dev/null 2>&1
visit /
check_home_sections "mobile"
agent-browser set viewport 1440 900 >/dev/null 2>&1

# Inner pages are out of scope and must keep their original banner.
visit /company; expect "Company banner is unchanged" "rgb(21, 134, 71)" "$(banner_colour)"
visit /contact; expect "Contact banner is unchanged" "rgb(21, 134, 71)" "$(banner_colour)"

echo
[ "$FAILURES" -eq 0 ] && echo "All checks passed." || echo "$FAILURES check(s) failed."
exit "$FAILURES"
