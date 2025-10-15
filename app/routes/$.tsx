import { type LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // Check if the request is for the Chrome DevTools JSON file
  if (url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    return new Response(null, {
      status: 204,
      statusText: 'No Content',
    });
  }

  // For all other unmatched routes, return a 404
  throw new Response(JSON.stringify({ message: 'Not Found' }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function CatchAllRoute() {
  return null;
}
