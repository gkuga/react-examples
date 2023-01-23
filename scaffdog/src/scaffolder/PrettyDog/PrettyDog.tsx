export type Props = React.PropsWithChildren<{}>;

export const PrettyDog: React.FC<Props> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};