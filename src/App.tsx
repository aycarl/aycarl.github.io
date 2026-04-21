import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Writing from "./pages/Writing.tsx";
import Archive from "./pages/Archive.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import Tag from "./pages/Tag.tsx";
import Post from "./pages/Post.tsx";
import Projects from "./pages/Projects.tsx";
import Project from "./pages/Project.tsx";
import About from "./pages/About.tsx";
import Experience from "./pages/Experience.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/archive" element={<Archive />} />
          <Route path="/writing/search" element={<SearchPage />} />
          <Route path="/writing/tag/:tag" element={<Tag />} />
          <Route path="/writing/:slug" element={<Post />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
