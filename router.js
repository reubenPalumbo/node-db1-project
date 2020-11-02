const express = require("express");

const db = require("./data/dbConfig");

const router = express.Router();

const Accounts = {
  getAll() {
    return db("accounts");
  },
  getById(id) {
    return db("accounts").where({ id });
  },
  create(account) {
    return db("accounts").insert(account);
  },
  update(id, account) {
    return db("accounts").where({ id }).update(account);
  },
  delete(id) {
    return db("accounts").where({ id }).del();
  },
};

router.get("/", (req, res) => {
  Accounts.getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  Accounts.getById(req.params.id)
    .then((data) => {
      if (!data.length) {
        res.json({ message: "no post with said id" });
      } else {
        res.json(data[0]);
      }
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

router.post("/", (req, res) => {
  Accounts.create(req.body)
    .then(([id]) => {
      return Accounts.getById(id).first();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

router.put("/:id", async (req, res) => {
  try {
    const count = await Accounts.update(req.params.id, req.body);
    if (!count) {
      res.json({ message: "no post with that id" });
    } else {
      const updatedPost = await Accounts.getById(req.params.id).first();
      res.json(updatedPost);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put("/:id", (req, res) => {
  Accounts.update(req.params.id, req.body)
    .then((count) => {
      if (!count) {
        res.json({ message: "no post with that id" });
      } else {
        return Accounts.getById(req.params.id).first();
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

router.delete("/:id", (req, res) => {
  Accounts.delete(req.params.id)
    .then((deletedRowsNumber) => {
      if (!deletedRowsNumber) {
        res.json({ message: "no post with given id" });
      } else {
        res.json({ message: "post deleted successfully" });
      }
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

module.exports = router;
