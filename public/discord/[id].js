export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `http://51.68.234.157:20206/api/status/${id}`,
      { cache: 'no-store' }
    );

    const data = await response.json();

    // React কম্পোনেন্টের জন্য success:true সহ রিটার্ন
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Discord API fetch failed'
    });
  }
}
