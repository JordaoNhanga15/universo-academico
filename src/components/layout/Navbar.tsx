
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold text-academia-600">Universo Acadêmico</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-academia-600 hover:text-academia-500">
              Início
            </Link>
            <Link to="/news" className="text-academia-600 hover:text-academia-500">
              Notícias
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link to="/admin" className="text-academia-600 hover:text-academia-500">
                Admin
              </Link>
            )}
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <User size={18} />
                    {user?.name}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="gap-2 text-red-500">
                    <LogOut size={16} />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Registrar</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 border-t mt-3">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-academia-600 hover:text-academia-500" onClick={() => setIsMenuOpen(false)}>
                Início
              </Link>
              <Link to="/news" className="text-academia-600 hover:text-academia-500" onClick={() => setIsMenuOpen(false)}>
                Notícias
              </Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link to="/admin" className="text-academia-600 hover:text-academia-500" onClick={() => setIsMenuOpen(false)}>
                  Admin
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Logado como {user?.name}</p>
                  </div>
                  <Button variant="ghost" className="justify-start pl-0 hover:bg-transparent" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t">
                  <Button variant="outline" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Registrar</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;
