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
          href='/vanilla.css'></link>
        <script src='/htmx.min.js'></script>
        <script src='/response-targets.min.js'></script>
        <script src='/htmx-event-listener.min.js'></script>
      </head>
      <body hx-ext='response-targets'>{children}</body>
    </html>
  );
});

export default layoutRenderer;
