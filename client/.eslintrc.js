module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "jsx-a11y/href-no-hash": 0,
        "jsx-a11y/alt-text": 0,
        "react/jsx-filename-extension": 0,
        "react/forbid-prop-types": 0,
        "camelcase": 0,
    },
    "env": {
        "browser": 1,
        "jest": 1
    }
};