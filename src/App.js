import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RequiredAuthLayout from "./layouts/RequiredAuthLayout";
import RootLayout from "./layouts/RootLayout";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import CreatePortfolioPage from "./pages/CreatePortfolioPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import PaymentCompletePage from "./pages/PaymentCompletePage";
import PaymentFailPage from "./pages/PaymentFailPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import QuotationListPage from "./pages/QuotationListPage";
import QuotationCreatePage from "./pages/QuotationCreatePage";
import QuotationUpdatePage from "./pages/QuotationUpdatePage";
import ReviewCreatePage from "./pages/ReviewCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/portfolios/:id" element={<PortfolioDetailPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<RequiredAuthLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/payments/complete"
              element={<PaymentCompletePage />}
            />
            <Route path="/payments/fail" element={<PaymentFailPage />} />
            <Route path="/chat/list" element={<ChatListPage />} />
            <Route path="/chat/:chatId" element={<ChatRoomPage />} />
            <Route
              path="/profile/create/portfolio"
              element={<CreatePortfolioPage />}
            />
            <Route path="/quotations/:chatId" element={<QuotationListPage />} />
            <Route
              path="/quotations/create/:chatId"
              element={<QuotationCreatePage />}
            />
            <Route
              path="/quotations/update/:quotationId"
              element={<QuotationUpdatePage />}
            />
            <Route
              path="/profile/reviews/create/:chatId"
              element={<ReviewCreatePage />}
            />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
