import instance from "."

export const getDashboardStats = async () => {

    try {
        const res = await instance.get("/dashboard/stats")
  return res.data
}
     catch (error) {
        
    }
}
  