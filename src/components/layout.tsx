import { jsxRenderer } from 'hono/jsx-renderer';

const layoutRenderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <title>{title}</title>
        <link
          rel='stylesheet'
          href='css/reset.css'></link>
        <link
          rel='stylesheet'
          href='css/vanilla.css'></link>
        <link
          rel='stylesheet'
          href='css/style.css'></link>
      </head>
      <script src='/htmx.min.js'></script>
      <script src='/response-targets.min.js'></script>
      <script src='/htmx-event-listener.min.js'></script>
      <body hx-ext='response-targets'>{children}</body>
    </html>
  );
});

export default layoutRenderer;
