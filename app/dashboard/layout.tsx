export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="sm:mx-40 md:mx-80 lg:mx-160 xl:mx-30">
        {children}
      </section>
    )
  }