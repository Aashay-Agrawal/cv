# Server-Side Rendering (SSR) Setup

Your portfolio site has been converted to use Server-Side Rendering, which means:

## ✅ What's Changed

1. **Dynamic Data Fetching**: Data is now fetched on each request instead of being built into static files
2. **Real-time Updates**: Changes to your data will be reflected immediately without rebuilding
3. **Flexible Data Sources**: You can now fetch data from external APIs, CMS, databases, or JSON files
4. **API Endpoints**: Added `/api/portfolio` endpoint for data management

## 🚀 How to Use

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## 📊 Data Sources

The site now supports multiple data sources. Edit `src/lib/data.ts` to configure:

### 1. JSON File (Recommended for simple updates)

Host a JSON file on GitHub, CDN, or your server:

```json
{
  "about": {
    "name": "Aashay Agrawal",
    "text": "Updated bio text..."
  },
  "projects": [
    {
      "href": "https://new-project.com",
      "title": "New Project"
    }
  ]
}
```

Then uncomment and update in `fetchExternalData()`:

```typescript
const response = await fetch("https://your-domain.com/portfolio-data.json");
const data = await response.json();
return data;
```

### 2. CMS Integration

Connect to Contentful, Strapi, or any CMS:

```typescript
const response = await fetch(
  "https://api.contentful.com/spaces/YOUR_SPACE_ID/entries?access_token=YOUR_TOKEN"
);
const data = await response.json();
return transformCMSData(data);
```

### 3. Environment Variables

For sensitive data like contact information:

```typescript
return {
  contact: {
    email: process.env.CONTACT_EMAIL || defaultData.contact.email,
    calendar: process.env.CALENDAR_LINK || defaultData.contact.calendar,
    freelance: process.env.FREELANCE_LINK || defaultData.contact.freelance,
  },
};
```

### 4. Database API

Connect to your own API or database:

```typescript
const response = await fetch("https://your-api.com/api/portfolio");
const data = await response.json();
return data;
```

## 🔄 API Endpoints

### GET `/api/portfolio`

Returns current portfolio data in JSON format.

### POST `/api/portfolio`

Accepts data updates (implement your logic here).

## 🎯 Benefits

- **No More Rebuilds**: Update content without rebuilding the entire site
- **Real-time Changes**: Changes appear immediately for visitors
- **Scalable**: Easy to add new data sources or CMS integration
- **Performance**: Still fast with server-side rendering
- **SEO Friendly**: Content is rendered on the server

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for sensitive data:

```
CONTACT_EMAIL=your-email@example.com
CALENDAR_LINK=https://cal.com/your-calendar
FREELANCE_LINK=https://contra.com/your-profile
```

### Caching

The site uses `Cache-Control: public, max-age=0, must-revalidate` to ensure fresh data on each request. You can adjust this in `next.config.ts` if needed.

## 📝 Next Steps

1. Choose your preferred data source
2. Update the `fetchExternalData()` function in `src/lib/data.ts`
3. Test your changes with `npm run dev`
4. Deploy to your hosting platform

## 🚨 Important Notes

- Remove `output: "export"` from `next.config.ts` (already done)
- Your hosting platform must support Node.js for SSR
- Consider using a CDN for static assets (images, CSS, JS)
- Monitor performance and adjust caching as needed

## 🆘 Troubleshooting

If you see build errors:

1. Make sure all imports are correct
2. Check that your data source is accessible
3. Verify TypeScript types match your data structure
4. Ensure your hosting platform supports SSR

For more help, check the Next.js documentation on Server Components and API Routes.
