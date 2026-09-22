# arielra@gmail.com - how this person wants to be worked with

- **Reaching the point where a change would ship with no test covering it** - any functional or
  non-functional behaviour, UI-only and formatting changes included - name the gap and get an
  explicit yes for that item before shipping it; silence is not the owner's consent, and a
  wholesale "tests were skipped" is not the per-item decision they are owed.
  (test-omission-per-item)

- **A test failing for a reason that looks unrelated to the change** - do not call it
  pre-existing and move on: say what is failing and get approval before going further, having
  verified rather than assumed the failure predates the work.
  (unrelated-failure-not-pre-existing)
