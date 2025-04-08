# Cipnitavla - Avatar Management Service

Cipnitavla is a modern avatar management service built with Next.js 15, providing a simple and efficient way to handle user avatars through a RESTful API. The service integrates with Tigris for secure and scalable object storage.

## Features

- **Avatar Storage**: Secure storage of user avatars using Tigris object storage
- **Presigned URLs**: Generate secure, time-limited URLs for avatar access
- **RESTful API**: Simple API endpoints for avatar management
- **Type Safety**: Full TypeScript support with strict type checking
- **Modern Stack**: Built with Next.js 15 App Router and latest web standards

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later
- A Tigris account with access credentials
- Git for version control

## Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nahtahul/cipnitavla.git
   cd cipnitavla
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Tigris credentials:
   ```env
   TIGRIS_ACCESS_KEY=your_access_key
   TIGRIS_SECRET_KEY=your_secret_key
   ```

## Development

Start the development server:
```bash
npm run dev
```

The server will start at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Get Avatar URL
```http
GET /api/avatar/[username]
```

Returns a presigned URL for accessing a user's avatar.

#### Response
```json
{
  "url": "https://fly.storage.tigris.dev/..."
}
```

## Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Testing

Run the test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Storage powered by [Tigris](https://www.tigrisdata.com)
