type ObjType = { [key: string]: any };

interface IProps {
  obj: ObjType;
  keys: string[];
}

export default function removeObjectKeys(props: IProps) {
  const { obj, keys } = props;

  const newObj = Object.keys(obj)
    .filter((key: string) => !keys.includes(key))
    .reduce((acc: ObjType, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

  return newObj;
}
