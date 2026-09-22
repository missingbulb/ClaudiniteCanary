// arielra@gmail.com's own pack - the rules that travel with the person rather
// than with any project, copied into every session they open on a project
// declaring the store this pack lives in.
//
// No id and no version: a person's pack is named by the directory, which is
// their exact identity, and it is never distributed as a canon pack is.
export default {
  ruleRoutingGuidance: {
    belongs: 'how this person wants to be worked with, in every project they work in',
    excludes: "a project's own conventions, which belong to the packs that own each subject",
  },
};
