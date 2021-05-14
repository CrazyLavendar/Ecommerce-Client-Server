import React, { useState, useEffect } from "react";
import AdminNav from "../../../component/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../component/forms/CategoryForm";
import LocalSearch from "../../../component/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state })); // get value anywhere from useSelector

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  //search Filtering
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    // used at option panel -- > Parent categories
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const loadSubs = () =>
    getSubs().then((s) => {
      setSubs(s.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    // console.log("Debug token ", user.token);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs(); //reload
      })
      .catch((err) => {
        // if (err.data.parent)
        //   toast.error("Please select a Parent Category first!");
        console.log(err.response.data);
        setLoading(false);
        if (err.response.status === 400)
          toast.error("Please select a Parent Category first!");
        else toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    let answer = window.confirm(`Are you sure to delete the ${slug} category`);
    if (answer) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(
            `${res.data.name} sub-category is successfully deleted`
          );
          loadSubs(); //reload
        })
        .catch((err) => {
          console.log(err.response.data);
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading ...</h4>
          ) : (
            <h4>Create sub category</h4>
          )}

          <div className="form-group">
            <label> Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option> Please Select </option>
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/*JSON.stringify(category)*/}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* filter(searched(keyword)) enables to filter whatever we types */}
          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
