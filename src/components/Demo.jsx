import { useState, useEffect } from "react";
import { loader } from "../assets";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { IoLanguageOutline, IoLinkOutline } from "react-icons/io5";
import { CgTrash } from "react-icons/cg";
import { useLazyGetSummaryQuery } from "../services/article";
import fetchTrans from "../services/fetchTrans";

function Demo({ darkMode }) {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
    translated: false,
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedArticles);

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  }

  function handleCopy(copyUrl) {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  function traduText(articol) {
    if (articol.translated == false) return;

    let oldArticles = JSON.parse(localStorage.getItem("articles"));
    const index = oldArticles.findIndex((obj) => obj.url === articol.url);
    fetchTrans(articol.summary)
      .then((res) => {
        setArticle((prev) => ({ ...prev, summary: res }));

        if (index !== -1) {
          oldArticles[index] = {
            ...oldArticles[index],
            summary: res,
            translated: true,
          };
        }
      })
      .catch(console.log)
      .finally(() => {
        setAllArticles(oldArticles);
        localStorage.setItem("articles", JSON.stringify(oldArticles));
      });
  }

  function removeFromStorage(e) {
    e.stopPropagation();
    const url = e.currentTarget.previousElementSibling.innerText;
    const oldArticles = JSON.parse(localStorage.getItem("articles"));
    const newArticles = oldArticles.filter((obj) => obj.url !== url);
    setAllArticles(newArticles);
    localStorage.setItem("articles", JSON.stringify(newArticles));
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center w-full"
          onSubmit={handleSubmit}
        >
          <IoLinkOutline
            className="absolute left-0 my-2 ml-3 w-7"
            color={darkMode ? "#fff" : "#000"}
          />

          <input
            className={`url_input peer focus:border-black ${
              darkMode && "input_dark focus:border-white"
            }`}
            type="url"
            placeholder="Introdu adresa web"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
          />
          <button
            type="submit"
            className={`${
              darkMode
                ? "submit_btn_dark peer-focus:border-gray-200 peer-focus:text-gray-200"
                : "submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            }`}
          >
            ⏎
          </button>
        </form>

        {/* Istoric */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className={`link_card ${darkMode && "input_dark"}`}
            >
              <div
                className={`copy_btn ${darkMode && "bg-gray-600"}`}
                onClick={() => handleCopy(item.url)}
              >
                {copied === item.url ? (
                  <AiOutlineCheck color={darkMode ? "#fff" : "#000"} />
                ) : (
                  <MdOutlineContentCopy
                    color={darkMode ? "#fff" : "#000"}
                    size={13}
                  />
                )}
              </div>
              <p
                className={`flex-1 font-satoshi font-medium text-sm truncate ${
                  darkMode ? "text-blue-200" : "text-blue-700"
                }`}
              >
                {item.url}
              </p>
              <div
                onClick={removeFromStorage}
                className="text-red-400 w-8 h-7 flex justify-center items-center"
              >
                <CgTrash />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Rezultatele*/}

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Something went wrong {":("}
            <br />
            <span className="font-satoshi text-red-700 font-normal">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2
                  className={`font-satoshi font-bold text-xl ${
                    darkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Rezumatul <span className="blue_gradient">Articolului</span>
                </h2>
                {!article.translated && (
                  <button
                    onClick={() => traduText(article)}
                    className="bg-blue-500 text-white py-1 px-2 rounded-md flex gap-1"
                  >
                    Tradu
                    <div className="text-lg flex items-center justify-center pt-1">
                      <IoLanguageOutline />
                    </div>
                  </button>
                )}
              </div>
              <div className="summary_box">
                <p
                  className={`font-inter font-medium text-sm text-gray-700 ${
                    darkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Demo;