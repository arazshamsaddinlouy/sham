const { Branch, Category } = require("../models");
async function getBranchLatLng(req, res) {
  const userId = req.user.id;
  const branchId = req.body.id;
  const branchLatLng = await Branch.findOne({
    attributes: ["lat", "lng"],
    where: { userId: userId, id: branchId },
  });
  if (branchLatLng) {
    return res.status(200).json(branchLatLng);
  } else {
    return res.status(401).json({ message: "غرفه یافت نشد" });
  }
}
async function getBranches(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "لطفا وارد شوید" });
    }

    // Fetch branches associated with the user
    const branches = await Branch.findAll({
      attributes: [
        "id",
        "name",
        "phone_number",
        "address",
        "categoryId",
        "first_name",
        "last_name",
        "twitter",
        "facebook",
        "instagram",
        "youtube",
        "whatsapp",
        "linkedin",
      ],
      where: { userId },
    });

    // Process each branch to fetch related categories
    const result = await Promise.all(
      branches.map(async (branch) => {
        const categoryIds = branch.categoryId
          ? branch.categoryId.split(",").map((id) => id.trim())
          : [];

        // Fetch categories in bulk using `findAll` with `where: { id: [ids] }`
        const categories = await Category.findAll({
          attributes: ["id", "title"],
          where: { id: categoryIds },
        });

        // Return the branch data along with associated categories
        return {
          ...branch.get({ plain: true }),
          categories,
        };
      })
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching branches:", error);
    return res.status(500).json({ message: "خطایی رخ داد" });
  }
}
async function editBranch(req, res) {
  const name = req.body.name;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.telephone;
  const address = req.body.address;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const userId = req.user.id;
  const categoryId = req.body.categoryId.join(",");
  const twitter = req.body.twitter;
  const instagram = req.body.instagram;
  const linkedin = req.body.linkedin;
  const whatsapp = req.body.whatsapp;
  const youtube = req.body.youtube;
  const facebook = req.body.facebook;
  const branchId = req.body.id;
  if (!userId) {
    return res.status(400).json({ message: " کاربر اجباری است." });
  }
  if (!name || name.length < 1) {
    return res.status(400).json({ message: "نام غرفه اجباری است." });
  }
  if (!first_name || first_name.length < 1) {
    return res.status(400).json({ message: "نام مسئول غرفه اجباری است." });
  }
  if (!last_name || last_name.length < 1) {
    return res
      .status(400)
      .json({ message: "نام خانوادگی مسئول غرفه اجباری است." });
  }
  if (!phone_number || phone_number.length < 1) {
    return res.status(400).json({ message: "شماره تلفن اجباری است." });
  }
  if (!address || address.length < 1) {
    return res.status(400).json({ message: "آدرس اجباری است." });
  }
  if (!lat || lat.length < 1) {
    return res.status(400).json({ message: "مختصات اجباری است." });
  }
  if (!lng || lng.length < 1) {
    return res.status(400).json({ message: "مختصات اجباری است." });
  }
  if (!branchId || branchId.length < 1) {
    return res.status(400).json({ message: "غرفه اجباری است." });
  }
  if (!categoryId || categoryId.length < 2) {
    return res.status(400).json({ message: "دسته بندی اجباری است." });
  }
  const branch = await Branch.findOne({
    attributes: ["id"],
    where: { id: branchId },
  });
  try {
    await branch.update({
      first_name: first_name,
      last_name: last_name,
      name: name,
      phone_number: phone_number,
      address: address,
      lat: lat,
      lng: lng,
      categoryId: categoryId,
      twitter: twitter || "",
      linkedin: linkedin || "",
      instagram: instagram || "",
      whatsapp: whatsapp || "",
      youtube: youtube || "",
      facebook: facebook || "",
      twitter: twitter || "",
    });
    return res.status(200).json({ message: "غرفه ویرایش شد" });
  } catch (e) {
    return res.status(500).json({ message: "کاربر ویرایش نشد" });
  }
}
async function deleteBranch(req, res) {
  const id = req.query.id;
  const userId = req.user.id;
  try {
    await Branch.destroy({ where: { id: id, userId: userId } });
    return res.status(200).json({ message: "غرفه حذف شد!" });
  } catch (e) {}
  return res.status(500).json({ message: "غرفه حذف نشد!" });
}
async function addBranch(req, res) {
  const name = req.body.name;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.telephone;
  const address = req.body.address;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const userId = req.user.id;
  const twitter = req.body.twitter;
  const instagram = req.body.instagram;
  const linkedin = req.body.linkedin;
  const whatsapp = req.body.whatsapp;
  const youtube = req.body.youtube;
  const facebook = req.body.facebook;
  const categoryId = req.body.categoryId.join(",");

  if (!name || name.length < 1) {
    return res.status(400).json({ message: "نام غرفه اجباری است." });
  }
  if (!first_name || first_name.length < 1) {
    return res.status(400).json({ message: "نام مسئول غرفه اجباری است." });
  }
  if (!last_name || last_name.length < 1) {
    return res
      .status(400)
      .json({ message: "نام خانوادگی مسئول غرفه اجباری است." });
  }
  if (!phone_number || phone_number.length < 1) {
    return res.status(400).json({ message: "شماره تلفن اجباری است." });
  }
  if (!address || address.length < 1) {
    return res.status(400).json({ message: "آدرس اجباری است." });
  }
  if (!lat || lat.length < 1) {
    return res.status(400).json({ message: "مختصات اجباری است." });
  }
  if (!lng || lng.length < 1) {
    return res.status(400).json({ message: "مختصات اجباری است." });
  }
  if (!categoryId || categoryId.length < 2) {
    return res.status(400).json({ message: "دسته بندی اجباری است." });
  }
  const branch = await Branch.create({
    first_name: first_name,
    last_name: last_name,
    name: name,
    phone_number: phone_number,
    address: address,
    lat: lat,
    lng: lng,
    userId: userId,
    categoryId: categoryId,
    twitter: twitter || "",
    linkedin: linkedin || "",
    instagram: instagram || "",
    whatsapp: whatsapp || "",
    youtube: youtube || "",
    facebook: facebook || "",
    twitter: twitter || "",
  });
  return res.status(200).json(branch);
}

module.exports = {
  addBranch,
  getBranches,
  getBranchLatLng,
  editBranch,
  deleteBranch,
};
