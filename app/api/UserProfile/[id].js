import dbConnect from '@/lib/dbConnect';
import UserProfile from '@/lib/models/UserProfile';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET': // Fetch single user profile
      try {
        const user = await UserProfile.findById(id);
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    // Add more cases for POST, PUT, DELETE
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
