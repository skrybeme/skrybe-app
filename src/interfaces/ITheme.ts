interface ITheme {
  card: {
    bg: string;
    bgHover: string;
    bgPlaceholder: string;
    bgPlaceholderHover: string;
    fg: string;
    fgPlaceholder: string;
    fgPlaceholderHover: string;
  };
  profilePicture: {
    bg: string;
    fg: string;
  },
  storyTree: {
    edge: string;
  };
  toolbar: {
    bg: string;
    fg: string;
  }
}

export default ITheme;
