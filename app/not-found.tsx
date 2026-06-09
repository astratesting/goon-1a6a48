import AnchorNav from "@/components/nav/AnchorNav";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <AnchorNav />
      <main id="content">
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-h1 text-text-primary mb-4">Page not found</h1>
            <p className="text-text-muted text-body mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <a href="/">
              <Button variant="ghost">Take me home</Button>
            </a>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
