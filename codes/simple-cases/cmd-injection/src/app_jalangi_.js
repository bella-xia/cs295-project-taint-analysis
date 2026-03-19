J$.iids = {"nBranches":14,"originalCodeFileName":"/analysis/codes/example-01/src/app.js","instrumentedCodeFileName":"/analysis/codes/example-01/src/app_jalangi_.js"};
jalangiLabel14:
    while (true) {
        try {
            J$.Se(2297, '/analysis/codes/example-01/src/app_jalangi_.js', '/analysis/codes/example-01/src/app.js');
            J$.N(2305, 'express', express, 0);
            J$.N(2313, 'exec', exec, 0);
            J$.N(2321, 'app', app, 0);
            var express = J$.X1(41, J$.W(33, 'express', J$.F(25, J$.R(9, 'require', require, 2), 0)(J$.T(17, 'express', 21, false)), express, 3));
            var exec = J$.X1(89, J$.W(81, 'exec', J$.G(73, J$.F(65, J$.R(49, 'require', require, 2), 0)(J$.T(57, 'child_process', 21, false)), 'exec', 0), exec, 3));
            var app = J$.X1(121, J$.W(113, 'app', J$.F(105, J$.R(97, 'express', express, 1), 0)(), app, 3));
            J$.X1(393, J$.M(385, J$.R(129, 'app', app, 1), 'get', 0)(J$.T(137, '/ping', 21, false), J$.T(377, function (req, res) {
                jalangiLabel1:
                    while (true) {
                        try {
                            J$.Fe(337, arguments.callee, this, arguments);
                            arguments = J$.N(345, 'arguments', arguments, 4);
                            req = J$.N(353, 'req', req, 4);
                            res = J$.N(361, 'res', res, 4);
                            J$.N(369, 'host', host, 0);
                            var host = J$.X1(177, J$.W(169, 'host', J$.G(161, J$.G(153, J$.R(145, 'req', req, 0), 'query', 0), 'host', 0), host, 1));
                            J$.X1(329, J$.F(321, J$.R(185, 'exec', exec, 1), 0)(J$.B(10, '+', J$.T(193, 'ping -c 1 ', 21, false), J$.R(201, 'host', host, 0), 0), J$.T(313, function (err, stdout) {
                                jalangiLabel0:
                                    while (true) {
                                        try {
                                            J$.Fe(281, arguments.callee, this, arguments);
                                            arguments = J$.N(289, 'arguments', arguments, 4);
                                            err = J$.N(297, 'err', err, 4);
                                            stdout = J$.N(305, 'stdout', stdout, 4);
                                            if (J$.X1(2329, J$.C(8, J$.R(209, 'err', err, 0))))
                                                J$.X1(241, J$.M(233, J$.R(217, 'res', res, 0), 'send', 0)(`FAIL: [${ J$.R(225, 'err', err, 0) }]\n`));
                                            else
                                                J$.X1(273, J$.M(265, J$.R(249, 'res', res, 0), 'send', 0)(`OK: [${ J$.R(257, 'stdout', stdout, 0) }]\n`));
                                        } catch (J$e) {
                                            J$.Ex(2337, J$e);
                                        } finally {
                                            if (J$.Fr(2345))
                                                continue jalangiLabel0;
                                            else
                                                return J$.Ra();
                                        }
                                    }
                            }, 12, false, 281)));
                        } catch (J$e) {
                            J$.Ex(2353, J$e);
                        } finally {
                            if (J$.Fr(2361))
                                continue jalangiLabel1;
                            else
                                return J$.Ra();
                        }
                    }
            }, 12, false, 337)));
            J$.X1(633, J$.M(625, J$.R(401, 'app', app, 1), 'get', 0)(J$.T(409, '/echo', 21, false), J$.T(617, function (req, res) {
                jalangiLabel3:
                    while (true) {
                        try {
                            J$.Fe(585, arguments.callee, this, arguments);
                            arguments = J$.N(593, 'arguments', arguments, 4);
                            req = J$.N(601, 'req', req, 4);
                            res = J$.N(609, 'res', res, 4);
                            J$.X1(577, J$.F(569, J$.R(417, 'exec', exec, 1), 0)(J$.B(18, '+', J$.T(425, 'echo ', 21, false), J$.G(449, J$.G(441, J$.R(433, 'req', req, 0), 'query', 0), 'host', 0), 0), J$.T(561, function (err, stdout) {
                                jalangiLabel2:
                                    while (true) {
                                        try {
                                            J$.Fe(529, arguments.callee, this, arguments);
                                            arguments = J$.N(537, 'arguments', arguments, 4);
                                            err = J$.N(545, 'err', err, 4);
                                            stdout = J$.N(553, 'stdout', stdout, 4);
                                            if (J$.X1(2369, J$.C(16, J$.R(457, 'err', err, 0))))
                                                J$.X1(489, J$.M(481, J$.R(465, 'res', res, 0), 'send', 0)(`FAIL: [${ J$.R(473, 'err', err, 0) }]\n`));
                                            else
                                                J$.X1(521, J$.M(513, J$.R(497, 'res', res, 0), 'send', 0)(`OK: [${ J$.R(505, 'stdout', stdout, 0) }]\n`));
                                        } catch (J$e) {
                                            J$.Ex(2377, J$e);
                                        } finally {
                                            if (J$.Fr(2385))
                                                continue jalangiLabel2;
                                            else
                                                return J$.Ra();
                                        }
                                    }
                            }, 12, false, 529)));
                        } catch (J$e) {
                            J$.Ex(2393, J$e);
                        } finally {
                            if (J$.Fr(2401))
                                continue jalangiLabel3;
                            else
                                return J$.Ra();
                        }
                    }
            }, 12, false, 585)));
            J$.X1(1009, J$.M(1001, J$.R(641, 'app', app, 1), 'get', 0)(J$.T(649, '/chain', 21, false), J$.T(993, function (req, res) {
                jalangiLabel5:
                    while (true) {
                        try {
                            J$.Fe(929, arguments.callee, this, arguments);
                            arguments = J$.N(937, 'arguments', arguments, 4);
                            req = J$.N(945, 'req', req, 4);
                            res = J$.N(953, 'res', res, 4);
                            J$.N(961, 'host', host, 0);
                            J$.N(969, 'prefix', prefix, 0);
                            J$.N(977, 'cmd', cmd, 0);
                            J$.N(985, 'cmd2', cmd2, 0);
                            var host = J$.X1(689, J$.W(681, 'host', J$.G(673, J$.G(665, J$.R(657, 'req', req, 0), 'query', 0), 'host', 0), host, 1));
                            var prefix = J$.X1(713, J$.W(705, 'prefix', J$.T(697, 'ping -c 1 ', 21, false), prefix, 1));
                            var cmd = J$.X1(745, J$.W(737, 'cmd', J$.B(26, '+', J$.R(721, 'prefix', prefix, 0), J$.R(729, 'host', host, 0), 0), cmd, 1));
                            var cmd2 = J$.X1(777, J$.W(769, 'cmd2', J$.B(34, '+', J$.R(753, 'cmd', cmd, 0), J$.T(761, '2>&1', 21, false), 0), cmd2, 1));
                            J$.X1(921, J$.F(913, J$.R(785, 'exec', exec, 1), 0)(J$.R(793, 'cmd2', cmd2, 0), J$.T(905, function (err, stdout) {
                                jalangiLabel4:
                                    while (true) {
                                        try {
                                            J$.Fe(873, arguments.callee, this, arguments);
                                            arguments = J$.N(881, 'arguments', arguments, 4);
                                            err = J$.N(889, 'err', err, 4);
                                            stdout = J$.N(897, 'stdout', stdout, 4);
                                            if (J$.X1(2409, J$.C(24, J$.R(801, 'err', err, 0))))
                                                J$.X1(833, J$.M(825, J$.R(809, 'res', res, 0), 'send', 0)(`FAIL: [${ J$.R(817, 'err', err, 0) }]\n`));
                                            else
                                                J$.X1(865, J$.M(857, J$.R(841, 'res', res, 0), 'send', 0)(`OK: [${ J$.R(849, 'stdout', stdout, 0) }]\n`));
                                        } catch (J$e) {
                                            J$.Ex(2417, J$e);
                                        } finally {
                                            if (J$.Fr(2425))
                                                continue jalangiLabel4;
                                            else
                                                return J$.Ra();
                                        }
                                    }
                            }, 12, false, 873)));
                        } catch (J$e) {
                            J$.Ex(2433, J$e);
                        } finally {
                            if (J$.Fr(2441))
                                continue jalangiLabel5;
                            else
                                return J$.Ra();
                        }
                    }
            }, 12, false, 929)));
            J$.X1(1321, J$.M(1313, J$.R(1017, 'app', app, 1), 'get', 0)(J$.T(1025, '/trim', 21, false), J$.T(1305, function (req, res) {
                jalangiLabel7:
                    while (true) {
                        try {
                            J$.Fe(1257, arguments.callee, this, arguments);
                            arguments = J$.N(1265, 'arguments', arguments, 4);
                            req = J$.N(1273, 'req', req, 4);
                            res = J$.N(1281, 'res', res, 4);
                            J$.N(1289, 'host', host, 0);
                            J$.N(1297, 'trimmed', trimmed, 0);
                            var host = J$.X1(1065, J$.W(1057, 'host', J$.G(1049, J$.G(1041, J$.R(1033, 'req', req, 0), 'query', 0), 'teststr', 0), host, 1));
                            var trimmed = J$.X1(1097, J$.W(1089, 'trimmed', J$.M(1081, J$.R(1073, 'host', host, 0), 'trim', 0)(), trimmed, 1));
                            J$.X1(1249, J$.F(1241, J$.R(1105, 'exec', exec, 1), 0)(J$.B(42, '+', J$.T(1113, 'ping -c 1 ', 21, false), J$.R(1121, 'trimmed', trimmed, 0), 0), J$.T(1233, function (err, stdout) {
                                jalangiLabel6:
                                    while (true) {
                                        try {
                                            J$.Fe(1201, arguments.callee, this, arguments);
                                            arguments = J$.N(1209, 'arguments', arguments, 4);
                                            err = J$.N(1217, 'err', err, 4);
                                            stdout = J$.N(1225, 'stdout', stdout, 4);
                                            if (J$.X1(2449, J$.C(32, J$.R(1129, 'err', err, 0))))
                                                J$.X1(1161, J$.M(1153, J$.R(1137, 'res', res, 0), 'send', 0)(`FAIL: [${ J$.R(1145, 'err', err, 0) }]\n`));
                                            else
                                                J$.X1(1193, J$.M(1185, J$.R(1169, 'res', res, 0), 'send', 0)(`OK: [${ J$.R(1177, 'stdout', stdout, 0) }]\n`));
                                        } catch (J$e) {
                                            J$.Ex(2457, J$e);
                                        } finally {
                                            if (J$.Fr(2465))
                                                continue jalangiLabel6;
                                            else
                                                return J$.Ra();
                                        }
                                    }
                            }, 12, false, 1201)));
                        } catch (J$e) {
                            J$.Ex(2473, J$e);
                        } finally {
                            if (J$.Fr(2481))
                                continue jalangiLabel7;
                            else
                                return J$.Ra();
                        }
                    }
            }, 12, false, 1257)));
            J$.X1(1649, J$.M(1641, J$.R(1329, 'app', app, 1), 'get', 0)(J$.T(1337, '/replace', 21, false), J$.T(1633, function (req, res) {
                jalangiLabel9:
                    while (true) {
                        try {
                            J$.Fe(1585, arguments.callee, this, arguments);
                            arguments = J$.N(1593, 'arguments', arguments, 4);
                            req = J$.N(1601, 'req', req, 4);
                            res = J$.N(1609, 'res', res, 4);
                            J$.N(1617, 'host', host, 0);
                            J$.N(1625, 'replaced', replaced, 0);
                            var host = J$.X1(1377, J$.W(1369, 'host', J$.G(1361, J$.G(1353, J$.R(1345, 'req', req, 0), 'query', 0), 'host', 0), host, 1));
                            var replaced = J$.X1(1425, J$.W(1417, 'replaced', J$.M(1409, J$.R(1385, 'host', host, 0), 'replace', 0)(J$.T(1393, 'bad', 21, false), J$.T(1401, 'good', 21, false)), replaced, 1));
                            J$.X1(1577, J$.F(1569, J$.R(1433, 'exec', exec, 1), 0)(J$.B(50, '+', J$.T(1441, 'ping -c 1 ', 21, false), J$.R(1449, 'replaced', replaced, 0), 0), J$.T(1561, function (err, stdout) {
                                jalangiLabel8:
                                    while (true) {
                                        try {
                                            J$.Fe(1529, arguments.callee, this, arguments);
                                            arguments = J$.N(1537, 'arguments', arguments, 4);
                                            err = J$.N(1545, 'err', err, 4);
                                            stdout = J$.N(1553, 'stdout', stdout, 4);
                                            if (J$.X1(2489, J$.C(40, J$.R(1457, 'err', err, 0))))
                                                J$.X1(1489, J$.M(1481, J$.R(1465, 'res', res, 0), 'send', 0)(`FAIL: [${ J$.R(1473, 'err', err, 0) }]\n`));
                                            else
                                                J$.X1(1521, J$.M(1513, J$.R(1497, 'res', res, 0), 'send', 0)(`OK: [${ J$.R(1505, 'stdout', stdout, 0) }]\n`));
                                        } catch (J$e) {
                                            J$.Ex(2497, J$e);
                                        } finally {
                                            if (J$.Fr(2505))
                                                continue jalangiLabel8;
                                            else
                                                return J$.Ra();
                                        }
                                    }
                            }, 12, false, 1529)));
                        } catch (J$e) {
                            J$.Ex(2513, J$e);
                        } finally {
                            if (J$.Fr(2521))
                                continue jalangiLabel9;
                            else
                                return J$.Ra();
                        }
                    }
            }, 12, false, 1585)));
            J$.X1(1929, J$.M(1921, J$.R(1657, 'app', app, 1), 'get', 0)(J$.T(1665, '/concat', 21, false), J$.T(1913, function (req, res) {
                jalangiLabel11:
                    while (true) {
                        try {
                            J$.Fe(1873, arguments.callee, this, arguments);
                            arguments = J$.N(1881, 'arguments', arguments, 4);
                            req = J$.N(1889, 'req', req, 4);
                            res = J$.N(1897, 'res', res, 4);
                            J$.N(1905, 'cmd', cmd, 0);
                            var cmd = J$.X1(1721, J$.W(1713, 'cmd', J$.M(1705, J$.T(1673, 'ping -c 1 ', 21, false), 'concat', 0)(J$.G(1697, J$.G(1689, J$.R(1681, 'req', req, 0), 'query', 0), 'host', 0)), cmd, 1));
                            J$.X1(1865, J$.F(1857, J$.R(1729, 'exec', exec, 1), 0)(J$.R(1737, 'cmd', cmd, 0), J$.T(1849, function (err, stdout) {
                                jalangiLabel10:
                                    while (true) {
                                        try {
                                            J$.Fe(1817, arguments.callee, this, arguments);
                                            arguments = J$.N(1825, 'arguments', arguments, 4);
                                            err = J$.N(1833, 'err', err, 4);
                                            stdout = J$.N(1841, 'stdout', stdout, 4);
                                            if (J$.X1(2529, J$.C(48, J$.R(1745, 'err', err, 0))))
                                                J$.X1(1777, J$.M(1769, J$.R(1753, 'res', res, 0), 'send', 0)(`FAIL: [${ J$.R(1761, 'err', err, 0) }]\n`));
                                            else
                                                J$.X1(1809, J$.M(1801, J$.R(1785, 'res', res, 0), 'send', 0)(`OK: [${ J$.R(1793, 'stdout', stdout, 0) }]\n`));
                                        } catch (J$e) {
                                            J$.Ex(2537, J$e);
                                        } finally {
                                            if (J$.Fr(2545))
                                                continue jalangiLabel10;
                                            else
                                                return J$.Ra();
                                        }
                                    }
                            }, 12, false, 1817)));
                        } catch (J$e) {
                            J$.Ex(2553, J$e);
                        } finally {
                            if (J$.Fr(2561))
                                continue jalangiLabel11;
                            else
                                return J$.Ra();
                        }
                    }
            }, 12, false, 1873)));
            J$.X1(2257, J$.M(2249, J$.R(1937, 'app', app, 1), 'get', 0)(J$.T(1945, '/slice', 21, false), J$.T(2241, function (req, res) {
                jalangiLabel13:
                    while (true) {
                        try {
                            J$.Fe(2193, arguments.callee, this, arguments);
                            arguments = J$.N(2201, 'arguments', arguments, 4);
                            req = J$.N(2209, 'req', req, 4);
                            res = J$.N(2217, 'res', res, 4);
                            J$.N(2225, 'host', host, 0);
                            J$.N(2233, 'sliced', sliced, 0);
                            var host = J$.X1(1985, J$.W(1977, 'host', J$.G(1969, J$.G(1961, J$.R(1953, 'req', req, 0), 'query', 0), 'host', 0), host, 1));
                            var sliced = J$.X1(2033, J$.W(2025, 'sliced', J$.M(2017, J$.R(1993, 'host', host, 0), 'slice', 0)(J$.T(2001, 0, 22, false), J$.T(2009, 20, 22, false)), sliced, 1));
                            J$.X1(2185, J$.F(2177, J$.R(2041, 'exec', exec, 1), 0)(J$.B(58, '+', J$.T(2049, 'ping -c 1', 21, false), J$.R(2057, 'sliced', sliced, 0), 0), J$.T(2169, function (err, stdout) {
                                jalangiLabel12:
                                    while (true) {
                                        try {
                                            J$.Fe(2137, arguments.callee, this, arguments);
                                            arguments = J$.N(2145, 'arguments', arguments, 4);
                                            err = J$.N(2153, 'err', err, 4);
                                            stdout = J$.N(2161, 'stdout', stdout, 4);
                                            if (J$.X1(2569, J$.C(56, J$.R(2065, 'err', err, 0))))
                                                J$.X1(2097, J$.M(2089, J$.R(2073, 'res', res, 0), 'send', 0)(`FAIL: [${ J$.R(2081, 'err', err, 0) }]\n`));
                                            else
                                                J$.X1(2129, J$.M(2121, J$.R(2105, 'res', res, 0), 'send', 0)(`OK: [${ J$.R(2113, 'stdout', stdout, 0) }]\n`));
                                        } catch (J$e) {
                                            J$.Ex(2577, J$e);
                                        } finally {
                                            if (J$.Fr(2585))
                                                continue jalangiLabel12;
                                            else
                                                return J$.Ra();
                                        }
                                    }
                            }, 12, false, 2137)));
                        } catch (J$e) {
                            J$.Ex(2593, J$e);
                        } finally {
                            if (J$.Fr(2601))
                                continue jalangiLabel13;
                            else
                                return J$.Ra();
                        }
                    }
            }, 12, false, 2193)));
            J$.X1(2289, J$.M(2281, J$.R(2265, 'app', app, 1), 'listen', 0)(J$.T(2273, 3000, 22, false)));
        } catch (J$e) {
            J$.Ex(2609, J$e);
        } finally {
            if (J$.Sr(2617)) {
                J$.L();
                continue jalangiLabel14;
            } else {
                J$.L();
                break jalangiLabel14;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
