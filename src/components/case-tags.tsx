export function CaseTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="label-mono border border-hairline px-2 py-1 opacity-70"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
