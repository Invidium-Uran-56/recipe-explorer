// Footer component to display copyright information at the bottom of the page.
function Footer() {
  return (
    // Footer section with centered text, vertical padding, and top margin.
    <footer className="footer text-center py-4 mt-5">
      <div className="container">
        {/* Displays the copyright notice and a friendly message. */}
        <p className="mb-0">
          © 2026 Recipe Explorer & Meal Planner.
          Made with love for food lovers.
        </p>
      </div>
    </footer>
  );
}

// Export the Footer component so it can be reused in other parts of the application.
export default Footer;