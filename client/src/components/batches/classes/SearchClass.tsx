import { IBatch } from "@/types/batch.type";
import { IClass } from "@/types/class.type";

type Props = {
  classes: IClass[];
  setClasses: (values: IClass[]) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  fetchClassByBatch: (value: string) => void;
  batch: IBatch;
};

const SearchClass = ({
  classes,
  setClasses,
  searchTerm,
  setSearchTerm,
  fetchClassByBatch,
  batch,
}: Props) => {
  const handleSearchClass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      setSearchTerm(searchTerm);
      const filtered = classes?.filter((cls) =>
        cls.title.toLowerCase().includes(searchTerm)
      );
      setClasses(filtered);
    } else {
      setSearchTerm("");
      fetchClassByBatch(batch.batchNo);
    }
  };

  const handleSelectClass = (cls: any) => {
    setClasses([cls]);
  };
  return (
    <div className="my-5">
      <input
        className="w-full border-2 border-blue-200 p-2 focus:outline-blue-600 rounded-md"
        type="text"
        name="class"
        id="class"
        defaultValue={searchTerm}
        onChange={handleSearchClass}
        placeholder="Search class"
      />
      {searchTerm && (
        <ul className="border border-blue-200 mt-2 rounded-md shadow-lg bg-white">
          {classes?.map((cls) => (
            <li
              key={cls.id}
              className="p-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelectClass(cls)}
            >
              {cls.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchClass;
