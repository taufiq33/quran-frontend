export default function Notification({ title, message }) {
  return (
    <>
      <h2 className="text-lg mb-2 font-bold text-center">{title}</h2>
      <p>{message}</p>
    </>
  );
}
