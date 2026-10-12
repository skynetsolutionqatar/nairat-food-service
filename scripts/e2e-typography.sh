#!/usr/bin/env bash
# End-to-end checks for the design system fonts on every page.
# Usage: pnpm dev (in another terminal), then: bash scripts/e2e-typography.sh [base-url]
set -uo pipefail

BASE_URL="${1:-http://localhost:3000}"
FAILURES=0
ENGLISH_PAGES="/ /company /products/fruits /services /quality /partners /contact /privacy"
ARABIC_PAGES="/ar /ar/company"

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

# Counts the elements matching a selector whose first font is not the expected face.
off_font() {
  evaluate "[...document.querySelectorAll('$1')].filter((element) => !getComputedStyle(element).fontFamily.split(',')[0].includes('$2')).length"
}

count() { evaluate "document.querySelectorAll('$1').length > 0"; }
has_scroll() { evaluate "document.documentElement.scrollWidth > innerWidth"; }

check_fonts() {
  local page="$1" heading_face="$2" eyebrow_face="$3"
  visit "$page"
  expect "$page: page has headings" "true" "$(count 'h1, h2, h3')"
  expect "$page: headings in $heading_face" "0" "$(off_font 'h1, h2, h3' "$heading_face")"
  expect "$page: eyebrows in $eyebrow_face" "0" "$(off_font '.type-eyebrow' "$eyebrow_face")"
}

check_no_scroll() {
  visit "$2"
  expect "$1 $2: no horizontal scroll" "false" "$(has_scroll)"
}

agent-browser set viewport 1440 900 >/dev/null 2>&1
for page in $ENGLISH_PAGES; do check_fonts "$page" "Figtree" "Montserrat"; done
for page in $ARABIC_PAGES; do check_fonts "$page" "Cairo" "Cairo"; done

check_no_scroll "desktop" /
check_no_scroll "desktop" /company
agent-browser set viewport 375 800 >/dev/null 2>&1
check_no_scroll "mobile" /
check_no_scroll "mobile" /company
agent-browser set viewport 1440 900 >/dev/null 2>&1

echo
[ "$FAILURES" -eq 0 ] && echo "All checks passed." || echo "$FAILURES check(s) failed."
exit "$FAILURES"
