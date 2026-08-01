# Kami privacy

There is no Kami server. Nothing you write with it is sent anywhere, because there is nowhere for it to be sent.

HTML version: <https://kami-resume-studio.vercel.app/privacy>

## This site

kami-resume-studio.vercel.app is a static deploy of the public repository, hosted on Vercel. It sets no cookies, runs no analytics, and loads no third-party scripts, fonts, or images: every asset, including the JetBrains Mono and TsangerJinKai typefaces, is served from this domain. There is no tag manager, no pixel, no A/B framework, and no consent banner, because there is nothing to consent to.

One value is stored in your browser: `kami-lang`, written to `localStorage` when you pick a language from the switcher, so the site stops redirecting you away from your choice. It never leaves the browser, and clearing site data removes it.

Vercel, as the host, records standard server access logs, including IP address, request path, and user agent, for delivery and abuse prevention. Those logs are Vercel's, held under their retention policy, and are not exported, joined with anything, or used to build a profile. Downloads of the release package are served by GitHub and are subject to GitHub's own logging.

## The skill

The Kami skill, its templates, its scripts, and its MCP server all run locally inside whatever agent installed them. They contain no telemetry, crash reporting, or license check. A quiet version check may read the public `VERSION` file at most once a day; it sends no career or document data and fails silently offline. Your briefs, your drafts, and the documents you render stay on your disk and are visible only to the agent you handed them to.

Two behaviours are worth stating plainly. First, rendering follows the document you give it: if your HTML references a remote image, stylesheet, or font, the renderer fetches it with your machine's network access, exactly as a browser would, so only render HTML you trust. Second, the MCP server reads and writes files with the permissions of the process you started it with; it exposes rendering and checking tools, not a sandbox.

Whether your document text reaches a model provider is a property of the agent you use Kami inside, not of Kami. If you drive it with a hosted assistant, that assistant's privacy terms apply to the conversation. Kami adds no additional destination.

## AI access policy

Search engines, AI answer engines, and assistants acting for a user are welcome to read this site, quote it, and learn from it: the documentation exists to be found, and everything here is MIT licensed source you can read directly on GitHub. That permission is stated as a machine-readable content signal in [robots.txt](https://kami-resume-studio.vercel.app/robots.txt). Bulk archive crawlers that return no reader to the source are disallowed there by name, which is a bandwidth judgement rather than a hostile one.

Questions about any of this, or a request to have a server log entry looked up or removed, go to the [contact page](https://kami-resume-studio.vercel.app/contact).

## Elsewhere

[Home](https://kami-resume-studio.vercel.app/) · [Developers](https://kami-resume-studio.vercel.app/developers) · [About](https://kami-resume-studio.vercel.app/about) · [Contact](https://kami-resume-studio.vercel.app/contact) · [Source](https://github.com/justinbao19/kami-resume-studio)
