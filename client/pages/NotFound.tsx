import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen bg-white flex items-center justify-center py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-roboto text-9xl font-bold text-black mb-4">
              404
            </h1>
            <h2 className="font-roboto text-3xl font-bold text-black mb-6">
              Page Not Found
            </h2>
            <p className="font-roboto text-lg text-gray-text mb-8 leading-relaxed">
              The page you're looking for doesn't exist. Let's get you back to
              building your resume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button
                  variant="outline"
                  className="font-roboto border-black text-black hover:bg-black hover:text-white"
                >
                  Go Home
                </Button>
              </Link>
              <Link to="/builder">
                <Button className="bg-black hover:bg-gray-800 text-white font-roboto">
                  Resume Builder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
