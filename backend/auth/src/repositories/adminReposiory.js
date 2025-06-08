import Admin from "../models/admin.js";

class AdminRepository {
  async getAdminByGoogle(googleId) {
    return Admin.findOne({ googleId });
  }

  async createAdmin(data) {
    const admin = new Admin(data);
    return admin.save();
  }
}

export default AdminRepository;
