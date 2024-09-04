class Livro {
    #id; // Esse uso do hashtag significa um atributo de uso privado
    #titulo;
    #autor;
    #anoPublicacao;
    #genero;
    #isbn;

    constructor(id, titulo, autor, anoPublicacao, genero, isbn) {
        this.#id = id;
        this.#titulo = titulo;
        this.#autor = autor;
        this.#anoPublicacao = anoPublicacao;
        this.#genero = genero;
        this.#isbn = isbn;
    }

    get id() {
        return this.#id;
    }

    get titulo() {
        return this.#titulo;
    }

    get autor() {
        return this.#autor;
    }

    get anoPublicacao() {
        return this.#anoPublicacao;
    }

    get genero() {
        return this.#genero;
    }

    get isbn() {
        return this.#isbn;
    }
}