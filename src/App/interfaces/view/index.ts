export default interface View {
  showPage: (pageName: string) => void;
  clearPage: () => void;
}
