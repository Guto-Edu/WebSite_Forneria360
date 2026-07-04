(function () {
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    });
  }

  function resolvePath(basePath, path) {
    if (!path) return "";
    if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
    var cleanBase = basePath.replace(/\/$/, "");
    if (!cleanBase || cleanBase === ".") return path;
    return cleanBase + "/" + path.replace(/^\.\//, "");
  }

  async function loadPosts(basePath) {
    var response = await fetch(resolvePath(basePath, "assets/blog-posts.json"));
    if (!response.ok) {
      throw new Error("Não foi possível carregar os posts do blog.");
    }
    return response.json();
  }

  function getPostUrl(basePath, slug) {
    return resolvePath(
      basePath,
      "blog/post.html?slug=" + encodeURIComponent(slug),
    );
  }

  function renderList(container, posts, basePath, limit) {
    var items = typeof limit === "number" ? posts.slice(0, limit) : posts;
    container.innerHTML = items
      .map(function (post) {
        return (
          '<a href="' +
          getPostUrl(basePath, post.slug) +
          '" class="blog-card paper-flat">' +
          '<img src="' +
          escapeHtml(resolvePath(basePath, post.cardImage)) +
          '" alt="' +
          escapeHtml(post.imageAlt) +
          '" class="w-full h-56 object-cover" />' +
          '<span class="copy block">' +
          '<span class="eyebrow">blog</span>' +
          '<h3 class="serif text-3xl text-[#173f2a] leading-none mt-2">' +
          escapeHtml(post.title) +
          "</h3>" +
          '<p class="text-[#6e624d] leading-7 mt-3">' +
          escapeHtml(post.excerpt) +
          "</p>" +
          "</span>" +
          "</a>"
        );
      })
      .join("");
  }

  function renderSections(post) {
    return post.sections
      .map(function (section) {
        if (section.type === "heading") {
          return "<h2>" + escapeHtml(section.content) + "</h2>";
        }
        if (section.type === "list") {
          return (
            "<ul>" +
            section.items
              .map(function (item) {
                return "<li>" + escapeHtml(item) + "</li>";
              })
              .join("") +
            "</ul>"
          );
        }
        return "<p>" + escapeHtml(section.content) + "</p>";
      })
      .join("");
  }

  function updateMeta(post) {
    document.title = post.title + " | Blog Forneria 360°";
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", post.description);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);
    var ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) ogDescription.setAttribute("content", post.description);
  }

  function renderPost(container, relatedContainer, posts, basePath) {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug") || posts[0].slug;
    var post = posts.find(function (item) {
      return item.slug === slug;
    });

    if (!post) {
      container.innerHTML =
        '<article class="article paper p-6 md:p-12 reveal visible">' +
        '<span class="eyebrow">blog</span>' +
        '<h1 class="display title-md text-[#173f2a] mt-4">Post não encontrado</h1>' +
        '<p>O conteúdo que você tentou abrir não está disponível.</p>' +
        '<a href="../blog.html" class="btn btn-ghost mt-8">Voltar ao blog</a>' +
        "</article>";
      return;
    }

    updateMeta(post);

    container.innerHTML =
      '<article class="article paper p-6 md:p-12 reveal visible">' +
      '<a href="../blog.html" class="btn btn-ghost mb-8">Voltar ao blog</a>' +
      '<span class="eyebrow">' +
      "</span>" +
      '<p class="text-sm uppercase tracking-[0.18em] text-[#6e624d] mt-5">' +
      escapeHtml(post.publishedAt) +
      " • " +
      escapeHtml(post.readTime) +
      "</p>" +
      '<h1 class="display title-md text-[#173f2a] mt-4">' +
      escapeHtml(post.title) +
      "</h1>" +
      '<p class="body-lg mt-6 text-[#6e624d]">' +
      escapeHtml(post.description) +
      "</p>" +
      '<img src="' +
      escapeHtml(resolvePath(basePath, post.image)) +
      '" alt="' +
      escapeHtml(post.imageAlt) +
      '" class="w-full h-64 md:h-96 object-cover rounded-[24px] mt-8 mb-10" />' +
      renderSections(post) +
      '<div class="mt-10 flex flex-col sm:flex-row gap-3">' +
      '<a href="https://instadelivery.com.br/forneria360" target="_blank" rel="noopener" class="btn btn-red">Pedir no InstaDelivery</a>' +
      '<a href="../localizacao.html" class="btn btn-ghost">Ver localização</a>' +
      "</div>" +
      "</article>";

    if (relatedContainer) {
      renderList(
        relatedContainer,
        posts.filter(function (item) {
          return item.slug !== post.slug;
        }),
        "..",
        2,
      );
    }
  }

  async function init() {
    var listNodes = document.querySelectorAll("[data-blog-list]");
    var postNode = document.querySelector("[data-blog-post]");

    if (!listNodes.length && !postNode) return;

    try {
      var basePath =
        (postNode && postNode.getAttribute("data-blog-base")) ||
        (listNodes[0] && listNodes[0].getAttribute("data-blog-base")) ||
        ".";
      var posts = await loadPosts(basePath);

      listNodes.forEach(function (node) {
        var limitValue = Number(node.getAttribute("data-blog-limit"));
        renderList(
          node,
          posts,
          node.getAttribute("data-blog-base") || ".",
          Number.isFinite(limitValue) && limitValue > 0
            ? limitValue
            : undefined,
        );
      });

      if (postNode) {
        renderPost(
          postNode,
          document.querySelector("[data-blog-related]"),
          posts,
          postNode.getAttribute("data-blog-base") || "..",
        );
      }
    } catch (error) {
      console.error(error);
      listNodes.forEach(function (node) {
        node.innerHTML =
          '<p class="text-[#6e624d]">Não foi possível carregar o blog agora.</p>';
      });
      if (postNode) {
        postNode.innerHTML =
          '<article class="article paper p-6 md:p-12 reveal visible"><h1 class="display title-md text-[#173f2a]">Não foi possível carregar este post.</h1><p>Tente novamente em instantes.</p></article>';
      }
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

