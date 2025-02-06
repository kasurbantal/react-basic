export type Teacher = {
  id: number;
  name?: string;
  job?: string;
  year: number;
};

export type ProfileCardProps = Omit<Teacher, "id">;

const ProfileCard = (props: ProfileCardProps) => {
  const { name = "Anonymous", year, job } = props;

  return (
    <div className="card1">
      <p>Nama: {name}</p>
      <p>Birth Year: {year}</p>
      {job && <p>Job: {job}</p>}
    </div>
  );
};

export default ProfileCard;
