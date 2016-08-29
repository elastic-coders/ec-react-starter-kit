export default async (args) => {
  await require('./clean')(args);
  await require('./copy')(args);
  await require('./bundle')(args);
};
