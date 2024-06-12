import Style from "./layout.style";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Style.OuterLayout>
      <Style.InnerLayout>{children}</Style.InnerLayout>
    </Style.OuterLayout>
  );
};

export default Layout;
