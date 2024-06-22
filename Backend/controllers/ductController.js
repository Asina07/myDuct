const mySqlPool = require("../confg/db");

// get all duct

// const getduct = async (req, res) => {
//   try {
//     const { page = 1, pageSize = 10, status } = req.query;
//     let query = "SELECT * FROM duct_table";

//     if (status && status !== "All") {
//       query += ` WHERE status = '${status}'`;
//     }

//     const offset = (page - 1) * pageSize;
//     const countQuery = query.replace("*", "COUNT(*) as totalCount");
//     const totalCountData = await mySqlPool.query(countQuery);
//     const totalCount = totalCountData[0][0].totalCount;

//     query += ` LIMIT ${pageSize} OFFSET ${offset}`;
//     const data = await mySqlPool.query(query);

//     if (!data) {
//       return res.status(404).send({
//         success: false,
//         message: "No records found",
//       });
//     }

//     const totalPages = Math.ceil(totalCount / pageSize);

//     res.status(200).send({
//       success: true,
//       message: "Records found",
//       totalduct: data[0].length,
//       totalPages,
//       totalCount,
//       data: data[0],
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in fetching ducts",
//       error,
//     });
//   }
// };

// const getduct = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       pageSize = 10,
//       status = "All",
//       job_number = "",
//       project = "",
//       item = "",
//     } = req.query;
//     let query = "SELECT * FROM duct_table";
//     let whereClauses = [];

//     if (status !== "All") {
//       whereClauses.push(`status = '${status}'`);
//     }

//     if (job_number) {
//       whereClauses.push(`job_number LIKE '%${job_number}%'`);
//     }

//     if (project) {
//       whereClauses.push(`project LIKE '%${project}%'`);
//     }

//     if (item) {
//       whereClauses.push(`item LIKE '%${item}%'`);
//     }

//     if (whereClauses.length > 0) {
//       query += " WHERE " + whereClauses.join(" AND ");
//     }

//     const offset = (page - 1) * pageSize;
//     const countQuery = query.replace("*", "COUNT(*) as totalCount");
//     const totalCountData = await mySqlPool.query(countQuery);
//     const totalCount = totalCountData[0][0].totalCount;

//     query += ` LIMIT ${pageSize} OFFSET ${offset}`;
//     const data = await mySqlPool.query(query);

//     if (!data) {
//       return res.status(404).send({
//         success: false,
//         message: "No records found",
//       });
//     }

//     const totalPages = Math.ceil(totalCount / pageSize);

//     res.status(200).send({
//       success: true,
//       message: "Records found",
//       totalduct: data[0].length,
//       totalPages,
//       totalCount,
//       data: data[0],
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in fetching ducts",
//       error,
//     });
//   }
// };

const getduct = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      status = "All",
      job_number = "",
      project = "",
      item = "",
    } = req.query;
    let query = "SELECT * FROM duct_table";
    let whereClauses = [];

    if (status !== "All") {
      whereClauses.push(`status = '${status}'`);
    }

    if (job_number) {
      whereClauses.push(`job_number LIKE '%${job_number}%'`);
    }

    if (project) {
      whereClauses.push(`project LIKE '%${project}%'`);
    }

    if (item) {
      whereClauses.push(`item LIKE '%${item}%'`);
    }

    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    // Order by created_at descending to show newest items first
    query += " ORDER BY date DESC";

    const offset = (page - 1) * pageSize;
    const countQuery = query.replace("*", "COUNT(*) as totalCount");
    const totalCountData = await mySqlPool.query(countQuery);
    const totalCount = totalCountData[0][0].totalCount;

    query += ` LIMIT ${pageSize} OFFSET ${offset}`;
    const data = await mySqlPool.query(query);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).send({
      success: true,
      message: "Records found",
      totalduct: data[0].length,
      totalPages,
      totalCount,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching ducts",
      error,
    });
  }
};



// get duct by id
const getductById = async (req, res) => {
  try {
    const ductID = req.params.id;
    if (!ductID) {
      return res.status(404).send({
        success: false,
        message: "invalid duct id",
      });
    }

    // const data = await mySqlPool.query(`SELECT * FROM duct_table WHERE id =`+ ductID )
    const data = await mySqlPool.query(
      `SELECT * FROM duct_table WHERE id = ?`,
      [ductID]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No record found",
      });
    }
    res.status(200).send({
      success: true,
      ductDetail: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in  duct by id",
      error,
    });
  }
};

// create duct |post

// const createduct = async (req, res) => {
//   try {
//     const { job_number, project, area, item, square, pcs, status, delivery } =
//       req.body;

//     // Generate current date and time
//     const now = new Date();
//     const dateTime = now.toISOString().slice(0, 19).replace("T", " ");

//     const [result] = await mySqlPool.query(
//       `INSERT INTO duct_table (job_number, project, area, item, square, pcs, status, date, delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [job_number, project, area, item, square, pcs, status, dateTime, delivery]
//     );

//     if (result.affectedRows > 0) {
//       return res.status(201).send({
//         success: true,
//         message: "Record created successfully",
//       });
//     } else {
//       return res.status(500).send({
//         success: false,
//         message: "Failed to create record",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in creating record",
//       error: error.message,
//     });
//   }
// };
const createduct = async (req, res) => {
  try {
    const { job_number, project, area, item, square, pcs, status, delivery } =
      req.body;

    // Generate current date and time
    const now = new Date();
    const dateTime = now.toISOString().slice(0, 19).replace("T", " ");

    const [result] = await mySqlPool.query(
      `INSERT INTO duct_table (job_number, project, area, item, square, pcs, status, date, delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [job_number, project, area, item, square, pcs, status, dateTime, delivery]
    );

    if (result.affectedRows > 0) {
      return res.status(201).send({
        success: true,
        message: "Record created successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to create record",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating record",
      error: error.message,
    });
  }
};



//   update duct

const updateduct = async (req, res) => {
  try {
    const ductID = req.params.id;
    if (!ductID) {
      return res.status(404).send({
        success: false,
        message: "Invalid duct id",
      });
    }

    const {
      job_number,
      project,
      area,
      item,
      square,
      pcs,
      status,
      // date,
      delivery,
    } = req.body;

    const data = await mySqlPool.query(
      `UPDATE duct_table SET job_number = ?, project = ?, area = ?, item = ?, square = ?, pcs = ?, status = ?,  delivery = ? WHERE id = ?`,
      [
        job_number,
        project,
        area,
        item,
        square,
        pcs,
        status,
        // date,
        delivery,
        ductID,
      ]
    );

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Error in updating duct data",
      });
    }
    res.status(200).send({
      success: true,
      message: "Updated duct data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating duct",
      error: error,
    });
  }
};

const deleteduct = async (req, res) => {
  try {
    const ductID = req.params.id;
    if (!ductID) {
      return res.status(404).send({
        message: "error in id to delete duct",
        success: false,
      });
    }
    await mySqlPool.query(`DELETE FROM duct_table WHERE id = ?`, [ductID]);
    res.status(200).send({
      success: true,
      message: "Succesfully  delete duct",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete duct",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  getduct,
  getductById,
  createduct,
  updateduct,
  deleteduct,
};
