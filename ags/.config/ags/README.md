> [!CAUTION]
> This AGS config is not finished and has memory leaks. I am trying to fix this,
> and make it the best as I can, so for the time being, do not use this, unless 
> you are willing to contribute. Specifically, the wallpaper changer module causes
> a significant rise in memory which can be up to 900MB. However, you can remove this
> module by removing `WP()` from `ts/main.ts`. If you do, it will idle at around ~200MB.

# Getting Started
To get started, clone this repository, and put the entire content in `~/.config/ags`.
You can alternatively make a symbolic link by running `stow ags` in the root directory
of the repository. If everything is set up correctly, running `ags` should just work.s

# Starter Config

if suggestions don't work, first make sure
you have TypeScript LSP working in your editor

if you do not want typechecking only suggestions

```json
// tsconfig.json
"checkJs": false
```

types are symlinked to:
/usr/share/com.github.Aylur.ags/types
