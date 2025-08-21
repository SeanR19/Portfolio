# Sean Hammond Portfolio

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript.

## Features

- **Clean Design**: Modern, minimalist UI with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, smooth transitions, and 3D animations
- **Performance Optimized**: Lightweight and fast loading
- **No Dependencies**: Pure vanilla code - no frameworks needed

## Sections

1. **Hero Section**: Introduction with logo and call-to-action
2. **Projects**: Showcase of design work with hover effects
3. **Careers**: Timeline of professional experience
4. **Brands**: Animated ticker of client logos with 3D hover effects
5. **Tech Stack**: Scrolling showcase of tools and technologies
6. **Navigation**: Fixed bottom navbar with profile image

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Running Locally

1. Download or extract the project files
2. Open `index.html` in your browser
   
   **Or use a local server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have it installed)
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## Project Structure

```
sh-portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── js/
│   └── main.js         # JavaScript functionality
├── Assets/             # Images, logos, and SVGs
└── README.md           # This file
```

## Customization

### Colors
The color scheme is defined in `styles.css`:
- Background: `#212121`
- Card: `#2a2b2f`
- Primary: `#5d3be3`

### Fonts
- **Poppins**: Used for headings and UI elements
- **IBM Plex Mono**: Used for body text and technical content

### Animations
Custom animations include:
- `arrow-pop`: Button arrow animation
- `pulse-ring`: Status dot pulse effect
- `ticker-kf`: Brand logo ticker animation
- `tech-scroll`: Tech stack scrolling animation
- `spectrum-shift`: Gradient button animation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Netlify
1. Drag and drop your folder to [Netlify](https://netlify.com)
2. Your site will be live instantly

### Vercel
1. Upload your project folder to [Vercel](https://vercel.com)
2. Deploy automatically

### Any Static Host
Since this is a static site, you can deploy it to any web hosting service that supports static files.

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **Vanilla JavaScript**: Interactive functionality
- **Google Fonts**: Typography
- **Adobe Typekit**: Additional fonts

## Performance Tips

- All images are optimized for web
- CSS animations use GPU acceleration
- JavaScript is minimal and efficient
- No external dependencies to load

## License

This project is private and proprietary.
