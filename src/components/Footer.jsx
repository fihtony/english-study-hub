export default function Footer() {
  return (
    <footer class="bg-slate-50 border-t border-gray-200 full-width bottom-0">
      <div class="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p class="font-body-ui text-xs text-slate-500">© 2024 Linguist Library. Premium Academic English Study.</p>
        <div class="flex gap-6">
          <a class="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
          <a class="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
          <a class="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}