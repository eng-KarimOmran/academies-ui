import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchParams((prev) => {
      if (newValue) {
        prev.set("q", newValue);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  };

  return (
    <Input
      type="text"
      className="max-w-xs"
      placeholder="بحث..."
      value={searchParams.get("q") ?? ""}
      onChange={handleChange}
    />
  );
}
