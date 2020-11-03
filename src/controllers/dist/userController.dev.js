"use strict";

var user = require("../model/user");

var auth_token = require('../services/auth');

var md5 = require("md5");

var _require = require("./distributorController"),
    showAll = _require.showAll;

module.exports = {
  singup: function singup(req, res) {
    var _req$body, nome, sobrenome, usuario, senha, userExists, token;

    return regeneratorRuntime.async(function singup$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nome = _req$body.nome, sobrenome = _req$body.sobrenome, usuario = _req$body.usuario, senha = _req$body.senha;
            _context.next = 3;
            return regeneratorRuntime.awrap(user.findOne({
              usuario: usuario
            }));

          case 3:
            userExists = _context.sent;

            if (!userExists) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(401).json("Usuário já cadastrado!"));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(auth_token.generateToken({
              nome: nome,
              sobrenome: sobrenome,
              usuario: usuario,
              senha: md5(senha + global.SALT_KEY)
            }));

          case 8:
            token = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(user.create({
              nome: nome,
              sobrenome: sobrenome,
              usuario: usuario,
              senha: md5(senha + global.SALT_KEY),
              token: token
            }));

          case 11:
            return _context.abrupt("return", res.status(201).json("Cadastro realizado com sucesso!"));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  singin: function singin(req, res) {
    var _req$body2, usuario, senha, token, userExists, auxToken;

    return regeneratorRuntime.async(function singin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, usuario = _req$body2.usuario, senha = _req$body2.senha, token = _req$body2.token;
            _context2.next = 3;
            return regeneratorRuntime.awrap(user.findOne({
              usuario: usuario
            }));

          case 3:
            userExists = _context2.sent;

            if (userExists) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(401).json("Usuário não existe!"));

          case 6:
            if (!userExists.token) {
              _context2.next = 25;
              break;
            }

            if (!(userExists.token == token)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(201).json(token));

          case 11:
            if (!(userExists.senha == md5(senha + global.SALT_KEY))) {
              _context2.next = 24;
              break;
            }

            if (!token) {
              _context2.next = 16;
              break;
            }

            auxToken = token;
            _context2.next = 19;
            break;

          case 16:
            _context2.next = 18;
            return regeneratorRuntime.awrap(auth_token.generateToken({
              nome: userExists.nome,
              sobrenome: userExists.sobrenome,
              usuario: userExists.usuario,
              senha: md5(userExists.senha + global.SALT_KEY)
            }));

          case 18:
            auxToken = _context2.sent;

          case 19:
            _context2.next = 21;
            return regeneratorRuntime.awrap(user.updateOne({
              usuario: usuario
            }, {
              $set: {
                token: auxToken
              }
            }));

          case 21:
            return _context2.abrupt("return", res.status(201).json(auxToken));

          case 24:
            return _context2.abrupt("return", res.status(401).json("Senha inválida!"));

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  showAll: function showAll(req, res) {
    return regeneratorRuntime.async(function showAll$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = res;
            _context3.next = 3;
            return regeneratorRuntime.awrap(user.find());

          case 3:
            _context3.t1 = _context3.sent;
            return _context3.abrupt("return", _context3.t0.json.call(_context3.t0, _context3.t1));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};