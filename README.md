# Cipnitavla

Cipnitavla (from Lojban "cipni" - bird, "tavla" - talk) is a simplified Twitter clone built with Next.js 15, designed as a learning project to explore modern web development practices. The name cleverly means "bird talk" or "tweet" in Lojban, reflecting the project's Twitter-inspired functionality while adding a linguistic twist.

## Features

- **User Profiles**: Create and customize your profile with avatars
- **Posts**: Share your thoughts with text-based posts
- **Real-time Updates**: Experience instant updates using Next.js App Router
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Type Safety**: Full TypeScript support with strict type checking
- **Secure Storage**: User data and avatars stored securely with Tigris

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19
- **Styling**: Tailwind CSS
- **Storage**: Tigris for object storage (avatars)
- **Type Safety**: TypeScript
- **Linting**: ESLint

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

### Get User Avatar
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

More endpoints coming soon!

## Project Structure

```
cipnitavla/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # Reusable React components
│   └── lib/             # Utility functions and shared logic
├── public/              # Static assets
└── ...configuration files
```

## Learning Goals

This project is designed to help learn:
- Next.js 15 App Router architecture
- React Server Components
- API Routes in Next.js
- TypeScript best practices
- Secure file storage with Tigris
- Modern CSS with Tailwind
- Authentication and authorization (coming soon)

## Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deployment

Cipnitavla uses a fully automated CI/CD pipeline for deployment to Kubernetes:

### Continuous Integration
- GitHub Actions automatically builds and pushes Docker images on every push to main
- Images are tagged with the commit SHA for precise version tracking
- Images are stored in GitHub Container Registry (ghcr.io)

### Kubernetes Deployment
- Automatic deployment to Kubernetes when new images are pushed
- Uses SHA-tagged images for reliable version tracking and rollbacks
- Configuration includes:
  - Ingress with automatic HTTPS (cert-manager)
  - Environment variables from Kubernetes secrets
  - Health checks and zero-downtime deployments
  - Security context for enhanced container security

### Infrastructure
- Manifest files in `manifest.yaml` define the complete Kubernetes setup:
  - Service for internal networking
  - Ingress for external access
  - Deployment with security settings
  - ServiceAccount for pod permissions

To deploy manually (if needed):
```bash
kubectl apply -f manifest.yaml
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
- Inspired by Twitter's core functionality
