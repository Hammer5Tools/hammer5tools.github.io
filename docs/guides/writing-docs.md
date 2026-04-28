
# Writing Documentation

Learn how to contribute to the Hammer 5 Tools documentation.

## 1. File Location
All documentation files are `.md` (Markdown) files located in the `docs/` directory. 
- General pages: `docs/example-page.md`
- Guides: `docs/guides/example-guide.md`

## 2. Setting the Breadcrumb Path
To automatically set the breadcrumb at the top of the page, include a `# Path:` directive on the **very first line** of your Markdown file. Use colons `:` to separate sections.

```markdown
# Smart Prop Editor Header
...
```

The system will automatically convert this to:
`Tools > SmartProp Editor`

## 3. Special Components

### Callouts
Use the following syntax for stylized alerts:

> [!NOTE]
> Information that users should pay attention to.

> [!TIP]
> Helpful shortcuts or best practices.

> [!WARNING]
> Important warnings about potential issues.

### Media (Images & Videos)
Use standard Markdown syntax for both images and videos. The system automatically detects video extensions and renders a video player.

```markdown
![Hero Video](resources/videos/hero.mp4)
![Editor Interface](resources/images/interface.png)
```

## 4. Registering the Page
After creating the `\.md` file:
1. Open `docs.html`.
2. Add a `<li>` to the sidebar HTML in the appropriate category.
3. Add an entry to the `contentMap` variable in the `<script>` block to enable routing and next/prev navigation.
