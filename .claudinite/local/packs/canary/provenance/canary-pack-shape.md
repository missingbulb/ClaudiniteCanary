## 2026-08-09 · born · the check lands (ef2f620)
- **Mechanism:** a coded check.
- **Landed:** ef2f620

## 2026-09-29 · moved · into its scope folder, off the manifest's list
- **Reason:** a data-only manifest lists no modules; the folder is what the loader reads for the
  scope.
- **Mechanism:** a coded check discovered from the pack's rule folder.
- **Actor:** @missingbulb (owner).
- **Model:** claude-opus-5-5

## 2026-09-29 · scope-changed · reads the scope folders and skill directories, not the manifest's lists
- **Mechanism:** a scan of the tracked file list.
- **Reason:** the manifest no longer lists checks or skills; the folders are what the loader reads.
- **Actor:** @missingbulb (owner).
- **Model:** claude-opus-5-5
