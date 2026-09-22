# proposed-packs — extraction output, not this repo's content

Two packs converted out of GymSafe's `CLAUDE.md` (the file uploaded on 2026-09-22), parked here
for review. **Nothing here loads.** Neither pack is declared in `.claudinite-settings.json`, so
no rule, check or skill in this directory contributes anything to a session in ClaudiniteCanary
— which is deliberate: the canary's only signal is whether a real member still works against a
candidate canon ref, and real engineering opinions riding in here would turn it red for reasons
that have nothing to do with the ref under test.

| Path | Lands in | What it is |
| --- | --- | --- |
| [`gymsafe/`](gymsafe/) | the GymSafe repo, at `.claudinite/local/packs/gymsafe/` | that project's own conventions |
| [`arielra@gmail.com/`](arielra@gmail.com/) | `missingbulb/Shepherd`, at that store's `<path>/arielra@gmail.com/` | how this person wants to be worked with, in every project |
| [`gymsafe-CLAUDE.trimmed.md`](gymsafe-CLAUDE.trimmed.md) | the GymSafe repo, as `CLAUDE.md` | the routing map the source file becomes once the packs carry its rules |

The personal pack's directory name is its owner's exact identity, case included, because the
reader copies `<path>/<email>/` and nothing else.

Moving either pack to its home is a copy of the directory plus a declaration — `adopt-pack` for
the GymSafe side. Delete this directory once both have landed.
