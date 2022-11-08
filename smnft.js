// Raid 398999
var trackableElement;
var counter = document.getElementById('bottom');
var menu = document.querySelector(".menu");
var appMenu = document.querySelector(".app-menu-container");
var overlay = document.querySelector(".menu-background");
var burger = document.querySelectorAll(".app-menu-burger");

var touchingElement = false;
var startTime;
var startY = 0,
    startX = 0;
var currentY = 0,
    currentX = 0;

var isOpen = false;
var isMoving = false;
var menuHeight = 0;
var lastY = 0;
var lastX = 0;
var moveY = 0; // where in the screen is the menu currently
var dragDirection = "";
var maxOpacity = 0.5; // in case if you want to change this, don"t forget to change the value of the opacity in the css class .menu--visible .menu-background


// Wallet Page
var niftyMenuStyle = [
	exarchaCreateElement(
		"style", 
		"#wallet-author{position:relative;}" +
		".niftyHide{display:none;}" +
		".niftyMenuClose{-ms-transform: rotate(-180deg);transform: rotate(-180deg);}" +
		".niftyMenuClose{padding-bottom:10px;}" +
		".niftyMenuClose,.niftyMenuOpen{cursor:pointer;}" +
		".niftyMenuList{cursor:pointer;padding: 0px 10px;}" +
		".niftyMenuOpen{width: 100%;}" +
		".niftyMenuList:hover {background: #4f46e5;color: #fff;}" +
		".niftyMenu{text-transform: uppercase;font-weight: 600;font-size: 15px;text-align:center;position: fixed;right: 25px;top: 80px;border-radius: 15px;border: 2px solid #4f46e5;padding: 10px 10px;z-index:1}" +
		"#H2fa-container{margin: 20px 0px;}" +
		"#H2fa-title{text-transform: uppercase;margin: 30px 20px;}" +
		"#H2fa-table{width: 100%;margin: 20px 0px;}" +
		".H2fa-td-1{text-align: center;width: 20%;}" +
		".H2fa-td-2{width: 80%;}" +
		"#H2fa-action{width: 100%;}" +
		"#H2fa-action button{float: right;}" +
		"#H2fa-Next{margin: 0px 20px 50px 20px;}" +
		"#H2fa-Validate{text-align:center;}" +
		"#nft-marketplace-table table {border-collapse: separate;border-spacing: 0;}" + 
		"#nft-marketplace-table table th,#nft-marketplace-table .table td {text-align: center;  color: #fff;border-bottom: 1px solid #2c3848;vertical-align: middle;}" + 
		"#nft-marketplace-table table tr th:last-child,#nft-marketplace-table table tr td:last-child {border-right: 1px solid #2c3848;border-bottom: 1px solid #2c3848;}" + 
		"#nft-marketplace-table table tr th:first-child,#nft-marketplace-table table tr td:first-child {border-left: 1px solid #2c3848;}" + 
		"#nft-marketplace-table table tr th {border-top: 1px solid #2c3848;font-size: 14px;font-weight: normal;background: #19222e;letter-spacing: 1px;}" + 
		"#nft-marketplace-table table tr:first-child th:first-child {border-top-left-radius: 10px;}" + 
		"#nft-marketplace-table table tr:first-child th:last-child {border-top-right-radius: 10px;}" + 
		"#nft-marketplace-table table tr:last-child td:first-child {border-bottom-left-radius: 10px;}" + 
		"#nft-marketplace-table table tr:last-child td:last-child {border-bottom-right-radius: 10px;}" + 
		"#nft-marketplace-table table .buyTokenCurrency{padding: 5px 5px;border-radius: 3px;font-size: 12px;color: #ffffff;margin: auto;background: #233348;max-width: 70%;}" + 
		"#nft-marketplace-table table .btnLink{background-color:#510eb2;padding: 50% 0px;}" + 
		"#nft-marketplace-table table .btnLink:hover{color: #4231c0;background-color: #776dc0;border: unset;box-shadow: unset;outline: unset;}" + 
		"#nft-marketplace-table table tbody {font-size: 14px; font-weight: 400;}" +
		"#nft-marketplace-table table tbody .mpinformation hr{margin: 0.1rem auto;color: #263a59;width: 70%;opacity:1;}" +
		"#nft-marketplace-table table tbody .mpinformation{background: #0d131b;font-weight: 600;}" +
		"@media screen and (max-width: 600px){ #nft-marketplace-table table .btnLink{background-color:#510eb2;padding: 100% 0px!important;} }",
		[], []
	)
];
var niftyMenuDiv = [
	exarchaCreateElement(
		"div","",[{"class":"niftyMenu"}],[
			exarchaCreateElement(
				"div","",[{"style":"padding-bottom:10px;"}],[
					exarchaCreateElement("img","",[{"src":"https://image.admin.solutions/smnft-nifty-gif/f1eea6b1-689d-485d-aa8b-fc2065442401/1437961e-341f-466c-8998-fbacfdc04d24/73adb3d7-c677-48ec-af2e-bf611ee9c3f9"},{"width":"40px"}],[])
				]
			),
			exarchaCreateElement(
				"div","DISCONNECT",[{"class":"niftyMenuList niftyHide"},{"id":"walletLogout"}],[]
			),
			exarchaCreateElement(
				"div","BALANCES",[{"class":"niftyMenuList niftyHide"},{"id":"510efd70-d059-4f86-9763-c8a759e7aa25"}],[]
			),
			exarchaCreateElement(
				"div","LIST TOKEN",[{"class":"niftyMenuList niftyHide"},{"id":"5ebe7c8d-44ce-4cd0-8ffa-8118cb1a7d5f"}],[]
			),
			exarchaCreateElement(
				"div","BUY TOKEN",[{"class":"niftyMenuList niftyHide"},{"id":"edb3e42b-f989-443d-bf34-282b0a733055"}],[]
			),
			exarchaCreateElement(
				"div","ADD FUNDS",[{"class":"niftyMenuList niftyHide"},{"id":"813d9c22-cfa2-482f-b2ac-980b31bffc58"}],[]
			),
			exarchaCreateElement(
				"div","SEND FUNDS",[{"class":"niftyMenuList niftyHide"},{"id":"361b79e2-9d90-4ad9-87c5-4e5fe8bd7994"}],[]
			),
			exarchaCreateElement(
				"div","MY PROFILE",[{"class":"niftyMenuList niftyHide"},{"id":"a0e32047-fd1d-4109-bb98-5d08e2e6276e"}],[]
			),
			exarchaCreateElement(
				"div","MY LISTINGS",[{"class":"niftyMenuList niftyHide"},{"id":"becc8f53-4880-4eaf-a0af-427cf7c00ac0"}],[]
			),
			exarchaCreateElement(
				"div","GET WALLET ID",[{"class":"niftyMenuList niftyHide"},{"id":"copywallet"}],[]
			),
			exarchaCreateElement(
				"div","",[{"class":"niftyMenuOpen"}],[
					exarchaCreateElement(
						"img","",[{"src":"https://image.admin.solutions/smnft-nifty-arrow/f1eea6b1-689d-485d-aa8b-fc2065442401/1437961e-341f-466c-8998-fbacfdc04d24/936ea44e-72dd-48a3-a606-8827e019c185"},{"width":"30px"}],[]
					)
				]
			),
			exarchaCreateElement(
				"div","",[{"class":"niftyMenuClose niftyHide"}],[
					exarchaCreateElement(
						"img","",[{"src":"https://image.admin.solutions/smnft-nifty-arrow/f1eea6b1-689d-485d-aa8b-fc2065442401/1437961e-341f-466c-8998-fbacfdc04d24/936ea44e-72dd-48a3-a606-8827e019c185"},{"width":"30px"}],[]
					)
				]
			),
		]
	)
];
var niftymodalOpenModal2fa = [
	exarchaCreateElement(
		"div", "", [{"class":"modal fade modalOpenModal2fa"},{"tabindex":"-1"},{"role":"dialog"},{"aria-hidden":"true"},{"data-modal-index":"1"},{"data-backdrop":"static"},{"data-keyboard":"false"}], [
			exarchaCreateElement("div", "", [{"class":"modal-dialog modal-dialog-centered modal-md"},{"style":"max-width:600px;"}], [
				exarchaCreateElement("div", "", [{"class":"modal-content"},{"style":"background-color: #172230;"}], [
					exarchaCreateElement("div", "", [{"class":"modal-header"},{"style":"color:white;background: #5001b1;margin: 20px 20px 0px 20px;"}], [
						exarchaCreateElement("div", "", [{"style":"width: 100%;padding:25px 20px;"}], [
							exarchaCreateElement("h3","2FA",[{"id":"H2fa-body-title"}],[])
						]),
						exarchaCreateElement("i", "", [{"class":"fas fa-window-close btn-close"},{"data-bs-dismiss":"modal"},{"aria-label":"Close"}], [])
					]),
					exarchaCreateElement("div", "", [{"class":"modal-body"},{"style":"margin: 0px 21px 20px 21px;border-bottom: 1px solid gray;border-left: 1px solid gray;border-right: 1px solid gray;"}], [
						exarchaCreateElement("div","",[{"class":"row"}],[
							exarchaCreateElement("div","",[{"class":"col-lg-12"}],[
								exarchaCreateElement("div","",[{"id":"H2fa-container"}],[
									exarchaCreateElement("h6","",[{"id":"H2fa-title"}],[]),
									exarchaCreateElement("input","",[{"type":"hidden"},{"value":""}],[]),
									exarchaCreateElement("table","",[{"id":"H2fa-table"}],[]),
									exarchaCreateElement("div","",[{"id":"H2fa-Next"}],[]),
									exarchaCreateElement("div","",[{"id":"H2fa-Validate"}],[]),
								]),
								exarchaCreateElement("div","",[{"id":"H2fa-action"}],[
									exarchaCreateElement("button","Next",[{"id":"btn-next-one"},{"type":"button"},{"class":"btn"}],[]),
									exarchaCreateElement("button","Check",[{"id":"btn-next-two"},{"type":"button"},{"class":"btn"}],[]),
									exarchaCreateElement("button","Back",[{"id":"btn-back-one"},{"type":"button"},{"class":"btn"},{"style":"margin-right: 5px;"}],[]),
									exarchaCreateElement("button","Back",[{"id":"btn-back-two"},{"type":"button"},{"class":"btn"},{"style":"margin-right: 5px;"}],[]),
									exarchaCreateElement("button","Yes",[{"id":"btn-copy-clipboard"},{"type":"button"},{"class":"btn"},{"style":"margin-right: 5px;"}],[])
								])
							])
						])
					])
				])
			])
		]
	)
]

var TokenContainer = `<div class="showhideSection">
					      <input type="hidden" id="modalCardWithHandler" value="">
					      <div class="loading-indicators mb-3 mt-3 w-50 pull-right">
					         <div class="dot-floating"></div>
					      </div>
					      <div class="nonloading-indicators">
					        <div class="row" style="max-width: 600px;margin: 0px auto;padding: 40px 0px 40px 0px;">
					            <div id="Wview" class="col-md-4"><div class="btn" style="margin: 5px 0px;">Wallet View</div></div>
					            <div id="MPview" class="col-md-4"><div class="btn" style="margin: 5px 0px;">Music Player View</div></div>            
					            <div id="MPMessage" class="col-md-4"><div class="btn" style="margin: 5px 0px;">Messages</div></div></div>
					        </div> 
					        <div class="pagination">
					            <center class="center">
									PAGE: <span id="page"></span> &nbsp;&nbsp;&nbsp;
					                <a href="javascript:prevPage()" id="btn_prev" style="text-decoration:none;color:#4f46e5;font-weight:bold;background:white;padding:0px 5px;">PREV</a> 
					                <a href="javascript:nextPage()" id="btn_next" style="text-decoration:none;color:#4f46e5;font-weight:bold;background:white;padding:0px 5px;">NEXT</a>					                
									<span id="nft_filter">&nbsp;&nbsp;&nbsp;FILTER:&nbsp;&nbsp;&nbsp;
										<select id="select_filter">
											<option value="active">ACTIVE</option>
											<option value="inactive">INACTIVE</option>
										</select>
									</span>
					            </center>
					        </div>
					        <div class="row nftTokenList" style="max-width: 1060px;margin: 0px auto;"></div>
					        <div class="row nftTokenMusicList" style="max-width: 1060px;margin: 0px auto;display: none; margin: 0px auto 20px;">
					            <div id="player">
					                <audio controls="controls" controlsList="nodownload" style="max-width: 500px;width: 100%;"></audio>
					                <div style="padding: 10px 10px 10px 10px;font-size: 20px;max-width: 500px;width: 100%;margin: auto;color: #d6d6d6;">
					                    <i class="fas fa-backward pointer" onclick="prevpickSong()"></i>
					                    <span style="color: #4c4c4c;font-weight: 400;">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
					                    <i class="far fa-stop-circle pointer" onclick="stopSong()"></i>
					                    <span style="color: #4c4c4c;font-weight: 400;">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
					                    <i class="far fa-pause-circle pointer" onclick="pauseSong()"></i>
					                    <span style="color: #4c4c4c;font-weight: 400;">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
					                    <i class="far fa-play-circle pointer" onclick="playSong()"></i>
					                    <span style="color: #4c4c4c;font-weight: 400;">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
					                    <i class="fas fa-forward pointer" onclick="nextpickSong()"></i>
					                </div>
					                <div id="player"></div>
					                <div id="p-bg"></div>
					            </div>
					        </div>
					      </div>
					   </div>`
var footerModal  = `<!--modalOpenModalToken-->
			<div class="modal fade modalOpenModalToken" tabindex="-1" role="dialog" aria-hidden="true" style="" data-modal-index="1" data-backdrop="static" data-keyboard="false">
			    <div class="modal-dialog modal-dialog-centered modal-xl ">
			        <div class="modal-content" style="background-color: #172230;">
			            <div class="modal-header">
			                <i class="fas fa-window-close btn-close" data-bs-dismiss="modal" aria-label="Close"></i>
			            </div>
			            <div class="modal-body">
			                <div class="row">
			                    <div class="col-lg-4">
			                        <div class="profile-card-2 modalTokenImg" data-nfttoken-guid="e323d786-6510-4e36-a4f6-388f7a769e61">
			                            <img src="https://image.admin.solutions/Joystick/85b2a40b-449e-4405-ae6e-691c811377d6/e323d786-6510-4e36-a4f6-388f7a769e61/5f202f3d-0683-4cb6-b3e5-42040df66e1e" class="img img-responsive nft-cover" style="max-width: 100%;">
			                            <div class="profile-buttons">
			                                <div title="NFT Link"><a style="color: #fff;" class="modalNFTLink" target="_blank" href=""><i class="fas fa-external-link-alt"></i></a></div>
			                            </div>
			                            <div class="profile-nft modalTokenNFT">NFT <i class="fas fa-star" style="margin-left: 6px;font-size: 18px;"></i></div>
			                            <div class="profile-nft-category modalTokenCategory">live concert</div>
			                            <div class="profile-name-nft-token modalNameNFTToken">Test NFT BP Token 1</div>
			                            <div class="profile-name-nft">
			                                <div class="div"><span class="modalNameNFT">Test NFT BP</span></div>
			                            </div>
			                            <div class="profile-guid modalNFTGuid">e323d786-6510-4e36-a4f6-388f7a769e61</div>
			                        </div>
			                    </div>
			                    <div class="col-lg-8">
			                        <div class="row">
			                            <div class="col-lg-4"><span class="modalTitle">Description</span></div>
			                            <div class="col-lg-8"><span class="modalNFTDescription"></span></div>
			                        </div>
			                        <div class="row">
			                            <div class="col-lg-4"><span class="modalTitle">Token Serial Number</span></div>
			                            <div class="col-lg-8"><span class="modalNFTNumberOfToken"></span></div>
			                        </div>
			                        <div class="row">
			                            <div class="col-lg-4"><span class="modalTitle">Total Supply</span></div>
			                            <div class="col-lg-8"><span class="modalNFTTotalSupply"></span></div>
			                        </div>
			                       <div class="row">
			                            <div class="col-lg-4"><span class="modalTitle">Rarity</span></div>
			                            <div class="col-lg-8"><span class="modalNFTRarity"></span></div>
			                        </div>
			                        <div class="row">
			                            <div class="col-lg-4"><span class="modalTitle">Category</span></div>
			                            <div class="col-lg-8"><span class="modalNFTCategory"></span></div>
			                        </div>
			                        <div class="row">
			                            <div class="col-lg-4"><span class="modalTitle">Token URL</span></div>
			                            <div class="col-lg-8"><span class="modalSeemynftpage"></span></div>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			<img src='https://chart.googleapis.com/chart?cht=qr&chl={"type":"wallet","guid":"` + $(location).attr('pathname').substring(1) + `"}&chs=160x160&chld=L|0' class="qr-code img-thumbnail img-responsive" id="qrCode" style="position: fixed;left: 25px;top: 80px;width:80px"/>
			<!--modalOpenMessageModal-->
			<div class="modal fade show" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" data-bs-backdrop="static" style="padding-left: 0px;" aria-modal="true" role="dialog">
			    <div class="modal-dialog modal-xl">
			        <div class="modal-content" style="background-color: #172230;">
			             <div class="modal-header">
			                <button class="btn btn-primary" onclick="valid()">Manage Message/View Private Message</button>
			                <i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close" onclick="closemessageModal()"></i>
			            </div>   
			            <div class="modal-body">
			                <main class="content" style="height: 100%;">
			                    <div class="card">
			                        <div class="row">
			                            <div class="col-sm-3">
			                                <select onchange="getval(this);" class="form-select" aria-label="Default select example" style="margin-bottom: 5px;">
			                                    <option value="2">All</option>
			                                    <option selected value="0">Unread</option>
			                                    <option value="1">Read</option>
			                                </select>
			                            </div>
			                        </div>
			                        <div class="row g-0" style="height: 100%;"> 

			                            <div class="col-sm-5 col-lg-5 col-xl-3 border-right left-con direct-chat-messages">
			                                
			                                <div id="msgData">
			                                    
			                                </div>
			                                
			                                <hr class="d-block d-lg-none mt-1 mb-0">
			                            </div>
			                            <div class="col-sm-7 col-lg-7 col-xl-9" style="height: 100%;">
			                                <div class="box box-warning direct-chat direct-chat-warning">
			                                    <div class="box-body">
			                                        <div class="direct-chat-messages" id="msgDataFull">
			                                            
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="col-12 col-lg-7 col-xl-9">
			                                <div class="position-relative">
			                                    
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </main>
			            </div>
			        </div>
			    </div>
			</div>
			<!--modalOpenTwofamodal-->
			<div class="modal fade" id="twofamodal" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="twofamodallabel" tabindex="-1">
			    <div class="modal-dialog sm modal-dialog-centered">
			        <div class="modal-content" style="background-color: #172230;padding: 20px;">
			            <i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close"></i>
			            <div class="body-border">
			                <div class="modal-body">
			                    <div class="container-fluid" style="padding: 20px 50px">
			                        <div class="row align-items-center g-3 mb-4">
			                            <h5 class="modal-text test-white">Tell us how to contact you to get this party started!</h5>
			                            <div id="listtwofa"></div>
			                            <div class="col-md-12">
			                                <input type="text" class="form-control" placeholder="" id="InputIDfrom2FA">
			                            </div>
			                        </div>
			                        <div class="row align-items-center g-3">
			                            <div class="col-md-12">
			                                <h5 class="modal-text test-white">Wallet ID from 2FA</h5>
			                                <h6 class="modal-text test-white" id="WalletIDfrom2FA"></h6>
			                            </div>
			                            <div class="col-md-12 d-grid">
			                                <button id="confirm2fBtn" class="btn btn-primary transaction text-uppercase" onclick="confirm2FA()">validate</button>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			<!--modalOpenMobilemodalMessage-->
			<div class="modal fade show" id="mobilemodalMessage" tabindex="-1" data-bs-backdrop="static" style="padding-left: 0px;" aria-modal="true" role="dialog" data-bs-backdrop="static" >
			    <div class="modal-dialog modal-dialog-centered">
			        <div class="modal-content" style="background-color: #172230;border: 1px solid #676767;">
			            <div class="modal-header" style="margin: 0; padding: 0;z-index: 3;">
			                <i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close" onclick="mobilemodalMessage()"></i>
			            </div>
			            <div class="modal-body"></div>
			        </div>
			    </div>
			</div>
			<!--modalOpenReadmoremodalMessage-->
			<div class="modal fade show" id="readmoremodalMessage" tabindex="-1" aria-labelledby="messageModalLabel" data-bs-backdrop="static" style="padding-left: 0px; " aria-modal="true" role="dialog">
			    <div class="modal-dialog modal-dialog-centered modal-xl">
			        <div class="modal-content" style="background-color: #172230;border: 1px solid #676767;">
			            <div class="modal-header" style="margin: 0; padding: 0;z-index: 3;">
			                <i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close" onclick="readmoremodalMessage()"></i>
			            </div>
			            <div class="modal-body"></div>
			        </div>
			    </div>
			</div>
			<div class="modal fade" id="qrCodeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  				<div class="modal-dialog modal-dialog-centered modal-sm">
    				<div class="modal-content" style="background-color: #172230;">
      					<i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close" style="z-index: 1;"></i>
      					<div class="modal-body">
        					<img src='https://chart.googleapis.com/chart?cht=qr&chl={"type":"wallet","guid":"` + $(location).attr('pathname').substring(1) + `"}&chs=160x160&chld=L|0' class="qr-code img-thumbnail img-responsive" id="qrCode" style="width:100%;height:auto;"/>
      					</div>
    				</div>
  				</div>
			</div>

			<!--V Card QrCode-->
			<div class="modal fade" id="VCardQRModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  				<div class="modal-dialog modal-dialog-centered modal-sm">
    				<div class="modal-content" style="background-color: #172230;">
      					<i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close" style="z-index: 1;"></i>
      					<div class="modal-body">
        					<img src='https://chart.googleapis.com/chart?cht=qr&chl={"type":"wallet","guid":"` + $(location).attr('pathname').substring(1) + `"}&chs=160x160&chld=L|0' class="qr-code img-thumbnail img-responsive" id="ModalVCardQRImg" style="width:100%;height:auto;"/>
      					</div>
    				</div>
  				</div>
			</div>	

			<!--Wallet Link QrCode-->
			<div class="modal fade" id="WalletLinkQRModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  				<div class="modal-dialog modal-dialog-centered modal-sm">
    				<div class="modal-content" style="background-color: #172230;">
      					<i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close" style="z-index: 1;"></i>
      					<div class="modal-body">
        					<img src='https://chart.googleapis.com/chart?cht=qr&chl={"type":"wallet","guid":"` + $(location).attr('pathname').substring(1) + `"}&chs=160x160&chld=L|0' class="qr-code img-thumbnail img-responsive" id="ModalWalletLinkQRImg" style="width:100%;height:auto;"/>
      					</div>
    				</div>
  				</div>
			</div>		
			
			<!--Get Referral QrCode-->
			<div class="modal fade" id="GetReferralQRModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  				<div class="modal-dialog modal-dialog-centered modal-sm">
    				<div class="modal-content" style="background-color: #172230;">
      					<i class="fas fa-times-circle" data-bs-dismiss="modal" aria-label="Close" style="z-index: 1;"></i>
      					<div class="modal-body">
        					<img src='https://chart.googleapis.com/chart?cht=qr&chl={"type":"wallet","guid":"` + $(location).attr('pathname').substring(1) + `"}&chs=160x160&chld=L|0' class="qr-code img-thumbnail img-responsive" id="ModalGetWalletQRImg" style="width:100%;height:auto;"/>
      					</div>
    				</div>
  				</div>
			</div>							

			<div class="modal fade" id="exampleModalToggle" tabindex="-1" aria-labelledby="messageModalLabel" data-bs-backdrop="static" style="padding-left: 0px; " aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="background-color: #172230;border: 1px solid #676767;">
                        <div class="modal-body text-center">    
                            <h2 id="inputAddress">We just sent it to </h2>
                            <p>Please click the Verify link that we just sent you before the countdown ends.</p>
                            <hr>
                            <div id="app"></div>
                            <p>Do not close. Authentication will automatically close in 120 seconds or after you click Verify link.</p>
                        </div>
                    </div>
                </div>
            </div>
			<div class="modal fade right " id="fulmodalwallet" tabindex="-1" aria-labelledby="exampleModalFullscreenLabel" aria-modal="true" role="dialog" data-toggle="modal" data-backdrop="static" data-keyboard="false">
  				<div class="modal-dialog modal-fullscreen modal-side modal-top-right" style="width: 100% !important;    max-width: 100% !important;">
    				<div class="modal-content">
      					<div class="modal-header" style="background-color: #4f46e5;">
        					<h5 data-bs-dismiss="modal" aria-label="Close" class="modal-title h4" id="exampleModalFullscreenLabel" style="padding:0;cursor: pointer;"><i class="far fa-arrow-to-left"></i> Back </h5>
      					</div>
      					<div class="modal-body" style="background-color: #0b111d;padding:0px;padding:0px;">
        					
      					</div>
    				</div>
  				</div>
			</div>
	<div class="app">
          <header class="app-header">
            <img src="https://image.admin.solutions/see-my-nft/af19c591-3e01-484b-ad0a-06e4b64f7851/827a8113-bbb6-4725-81e6-b406c3c4fb0a/2255f63f-958a-43c6-b7f0-31ffa44f3f4c" alt="">
            <button class="app-header-btn app-header-btn--notification" id="Mprofile">
              <img src="`+mainImage+`" alt="App notification">
            </button>
          </header>
          <main class="app-body">
      
            <section class="section" id="mobile-token" style="display: none;">
              <div class="section-body">
                <div class="card">
                  <div class="card-content">
                    <div class="token-nav">
                      <a href="#modalOpenMenu" class="card-subtitle" id="walletLogouts" style="display: none;">Disconnect</a>
                      <a href="#modalOpenMenu" class="card-subtitle" id="balance1">Balance</a>
                      <a href="#modalOpenMenu" class="card-subtitle" id="ListToken">List Token</a>
                      <a href="#modalOpenMenu" class="card-subtitle">Buy Token</a>
                      <a href="#modalOpenMenu" class="card-subtitle" id="AddFunds">Add Funds</a>
                      <a href="#modalOpenMenu" class="card-subtitle" id="SendFunds">Send Funds</a>
                      <a href="#modalOpenMenu" class="card-subtitle" id="MyProfile">My Profile</a>
                      <a href="#modalOpenMenu" class="card-subtitle">My Listings</a>
                      <a href="#modalOpenMenu" class="card-subtitle" id="copywallets">Get Wallet Id</a>   
                    </div>   
                    <div class="m-balance" style="display: none;">
                      <i class="fas fa-times-circle" id="m-balanceClose"></i>
                      <h1>Let's see how much you can buy!</h1>
                      <h5 id="H2fa-title2"></h5>
                      <div class="m-listOf2faNFTWallet">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                          <label class="form-check-label" for="flexRadioDefault1">
                            cha***@***om - email
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                          <label class="form-check-label" for="flexRadioDefault2">
                            +3460***33 - sms
                          </label>
                        </div>
                      </div>
                      <div id="H2fa-Next2"></div>
                      <div id="H2fa-action">
                        <button id="btn-next-two2" type="button" class="btn" >Check</button>
                        <button id="btn-back-one2" type="button" class="btn" style="margin-right: 5px;">Back</button>
                        <button id="btn-next-one2" type="button" class="btn">Next</button>
                        <button id="btn-copy-clipboard2" type="button" class="btn">Yes</button>
                      </div> 
                    </div>                                  
                  </div>                  
                </div>
              </div>
            </section>
      
            <section class="section" id="mobile-music" style="display:none">
              <div class="section-body">
                <div class="card">
                  <div class="card-content">
                      <div class="iphone neu">
                        <div class="title">
                          <div><i class="fas fa-chevron-left"></i></div>
                          <div>NOW PLAYING</div>
                          <div><i class="fas fa-ellipsis-v"></i></div>
                        </div>
                        <div class="album-cover"> 
                          <!-- <h2 class="song-title">
                            RocaVaka Launch Party Ticket Madrid 2022
                          </h2> -->
                          <!-- <h3 class="artist-title">
                            Childish Gambino
                          </h3> -->
                          <br>
                        </div>
                        <div class="buttons">
                            <button class="btn lg neu"><i class="fas fa-backward" onclick="prevpickSongM()"></i></button>
                            <button class="btn lg neu play-B" style="display: none;"><i class="fas fa-play" onclick="playSongM()"></i></button>
                            <button class="btn lg neu pause-B"><i class="fas fa-pause" onclick="pauseSongM()"></i></button>
                            <button class="btn lg neu"><i class="fas fa-forward" onclick="nextpickSongM()"></i></button>
                        </div>
                        <div>
                          <div class="progress">
                            <div class="currentValue" style="width: 0%;"></div>
                          </div>
                          <audio controls="controls" controlslist="nodownload" style="max-width: 500px;width: 100%;display:none;" name="audioM"></audio>
                        </div>
                        <div class="lyrics">            
                        </div>
                      </div>
                    </div>                              
                </div>
              </div>
            </section>   
            
            <section class="section" id="mobile-msg" style="display: none;">
              <div class="section-body">
                <div class="card">
                  <div class="card-content" style="overflow-y: scroll;">
                    <div class="items" style="height: auto;">
                      <div class="nav-section">
                        <div class="items-head">
                          <p>Manage Message</p>
                          <hr>
                        </div>                      
                        <div class="items-body">
                          <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Search" id="myInput" onkeyup="myFunction()">
                          </div>
                          <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group" role="group" aria-label="Third group">
                              <button type="button" class="btn btn-secondary" onclick="walletverification('2')">All</button>
                            </div>
                            <div class="btn-group" role="group" aria-label="Third group">
                              <button type="button" class="btn btn-secondary" onclick="walletverification('1')">Read</button>
                            </div>
                            <div class="btn-group" role="group" aria-label="Third group">
                              <button type="button" class="btn btn-secondary" onclick="walletverification('0')" >UnRead</button>
                            </div>
                          </div>                      
                        </div>
                      </div>
                      <div id="MobileMessageList">
                      </div>
                      <div id="MobileMessagedetails">
                        <a id="MsgClose"><i class="fas fa-times-circle" ></i></a>
                        <div class="msg-body">
                          <!-- <span class="date">Date Posted: 08/06/2022</span>
                          <h4>LOK Kommer HÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤rnÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤st PÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ SPARBANKEN SKANE STAGE 22.30</h4>
                          <img src="https://image.admin.solutions/see-my-nft/af19c591-3e01-484b-ad0a-06e4b64f7851/827a8113-bbb6-4725-81e6-b406c3c4fb0a/2255f63f-958a-43c6-b7f0-31ffa44f3f4c" alt="" >
                          <p>SÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ngaren Martin Westerstrand och basisten Daniel Cordero spelade tillsammans i flera olika konstellationer fram till 2010, och dÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ senast i Lillasyster, vilka vi ju kÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤nner vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤l. 2019 bÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rjade Martin och Daniel spela ihop igen, och nu tillsammans med Thomas Brandt (gitarr) och Johan ReivÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©n (trummor). De fyra utgÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶r ett ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥terfÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶renat LOK. LOK slog igenom i slutet av 90-talet med skivan ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂNaken, blÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤strad och skitsurÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â (1998). Arg musik som man blev glad av. ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂLOK stÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥r nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤r dom andra fallerÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â blev en stor hit som nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥dde hÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ga placeringar pÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ topplistorna. Andra populÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ra lÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥tar var t ex ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂSkrubbsÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â och ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂSug minÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â. Efter ytterligare tvÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ studioplattor la bandet dessvÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤rre ner 2002 och liveskivan ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂBlÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤strad levandeÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â gavs ut postumt 2003. 2019 gjorde gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤nget som sagt comeback och redan dÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ fanns det ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶nskan om spelande hos oss, men den ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶nskningen gÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥r i uppfyllelse fÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rst under 2022ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â´s festival. Den som vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ntar pÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥t gott...</p>
                          <img src="https://image.admin.solutions/lok-message-image/549bd30b-ff69-4095-b546-bfd8b1d00680/00aef34c-b608-476d-96d6-df1c06e2d8fb/2424fee9-4f5e-4bde-8460-93748f013f74" alt="" >-->
                        </div>                           
                      </div>                                          
                    </div>                    
                  </div>
                </div>
              </div>
            </section>          
			<div id="TokenContaineriframe"></div> 
          </main>
          <footer class="app-footer">
            <nav class="menu-bar">
              <a href="#modalClosedTokens" class="menu-bar-item" id="Mtoken">
                <img src="https://image.admin.solutions/token-mobile-menu/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/4cbf803e-9c2a-49eb-bcc8-18f5a86e3a23" alt="">
                <span class="menu-bar-item-text">Token</span>
              </a>
              <a href="#music" class="menu-bar-item" id="Mmusic">
                <img src="https://image.admin.solutions/music-mobile-menu/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/946aacb6-01e9-44b1-8764-68e79315dc79" alt="">
                <span class="menu-bar-item-text">Music</span>
              </a>
              <a href="#modalClosedMenu" class="menu-bar-item" id="Mmenu">
             <img src="https://image.admin.solutions/smnft-nifty-gif/f1eea6b1-689d-485d-aa8b-fc2065442401/1437961e-341f-466c-8998-fbacfdc04d24/73adb3d7-c677-48ec-af2e-bf611ee9c3f9" alt="">
                <span class="menu-bar-item-text">Menu</span>
              </a>
              <a href="#modalClosedMessage" class="menu-bar-item" id="Mmessage">
                <img src="https://image.admin.solutions/envelope-mobile-menu/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/8dc2b218-d34b-4415-92ad-e4774760f31d" alt="">
                <span class="menu-bar-item-text">Message</span>
              </a>
            </nav>
          </footer>
      </div>  
	  `;
var walletAuthor = `<div class="cover-img" style="background-image:url(`+coverImg+`);"></div>
			<div id="wallet-author">
				<div class="container">
					<!--<div class="avatar" style="background-image:url(https://image.admin.solutions/John-Carlo-Mamosog/61fdd0ac-d4d6-47a4-9d16-baf7f09d216e/aa4b8328-d4dc-46a5-9126-eef768c0fa49/f4c5564d-5cd2-4a72-b07b-ff55d491a818);"></div>-->
					<div class="swiper mySwiper">
						<div class="swiper-wrapper">
							<div class="swiper-slide" style="background: url('`+mainImage+`'); background-position: center; background-size: cover;border-radius: 50%;"></div>
							<div class="swiper-slide VCardQR-slide" style="background-color: white; color: black; text-align: center">
								<h3>Contact Card</h3>
								<img class="qr VCardQR" src="https://image.admin.solutions/learn-more/0694191c-93ac-4c09-afc0-7118412b845e/5c0aaa7d-5501-457f-942a-28df48ae2b5a/c547086e-470a-4a90-9ebd-cc86e31e5616" />
							</div>
							<div class="swiper-slide WalletLinkQR-slide-slide" style="background-color: white; color: black; text-align: center">
								<h3>Wallet Viewing</h3>
								<img class="qr WalletLinkQR" src="https://image.admin.solutions/learn-more/0694191c-93ac-4c09-afc0-7118412b845e/5c0aaa7d-5501-457f-942a-28df48ae2b5a/c547086e-470a-4a90-9ebd-cc86e31e5616" id="authqr"/>
							</div>
							<div class="swiper-slide GetWalletQR-slide" style="background-color: white; color: black; text-align: center">
								<h3>New Wallet Referral</h3>
								<img class="qr GetWalletQR" src="https://chart.googleapis.com/chart?cht=qr&amp;chl={&quot;type&quot;:&quot;wallet&quot;,&quot;guid&quot;:&quot;C:/Users/Johnny%20Boy/Downloads/wallet/wallet%20-%20Copy%20(2).html&quot;}&amp;chs=160x160&amp;chld=L|0" />
							</div>
						</div>
						<div class="swiper-button-next"></div>
						<div class="swiper-button-prev"></div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h1 class="author-name text-center">`+authorName+`</h1>
							<div class="col-md-9 mx-auto">
								<p class="author-bio text-center">`+authorBio+`</p>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 mx-auto" id="search-token-items"><br>
							<div class="input-group flex-nowrap mb-5">
								<span class="input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
								<input type="text" id="search-token-item" onkeyup="searchToken()" onfocus="this.value=''" class="form-control" placeholder="Search Token">
							</div>
						</div>  
					</div>
				</div>
			</div>`

// if(document.querySelector("#wallet-author")){
//     UserToken();
// 	initNFTListForWallet();
//     initVcardQR();
// 	initLoginStatus();
// }
if(document.querySelector("#wallet-author")){
    async function setupAuthID_A() {
        try {
            await UserToken();
			await init();
        } catch (error) {
            console.log(error);
        }
    }
    setupAuthID_A();
}

function init(){
	initNFTListForWallet();
	initVcardQR();
	initLoginStatus();
	appsd();
	updateUI();
}

$( document ).ready(function() {
	$("#TokenContaineriframe").hide()
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	document.head.appendChild(link);
	link.href = 'https://image.admin.solutions/smnft-main-mobile-css/4e187783-c778-4238-90e8-e8c82c29e32a/86657734-73d6-45a6-9f6f-a7ca0c9779f0/e3688254-98ad-47c4-8cc8-58dc6ca25dd8';
	$('#Mtoken').click(function() {
		$("#TokenContaineriframe").hide()
		$('#Token-iframe').attr('src', "");
		$("#TokenContainer").show(100);
		$("#mobile-wallet").hide();
		$("#mobile-music").hide();
		$("#mobile-token").hide();
		$("#mobile-msg").hide();
		$("#wallet-author").hide();
		$("#qrCode").hide();      
	});
	
	$('#Mmusic').click(function() {
		$("#TokenContaineriframe").hide()
		$('#Token-iframe').attr('src', "");
		$("#wallet-author").hide(500);
		$("#mobile-wallet").hide(500);
		$("#mobile-music").show(500);
		$("#mobile-token").hide(500);
		$("#mobile-msg").hide(500);
		$("#TokenContainer").hide(500);
		$("#qrCode").hide(500);
	});
	
	$('#Mmenu').click(function() {
		$("#wallet-author").hide(500);
		$("#TokenContaineriframe").hide()
		$('#Token-iframe').attr('src', "");
		$("#mobile-wallet").hide(500);
		$("#mobile-music").hide(500);
		$("#mobile-token").show(500);
		$("#mobile-msg").hide(500);
		$("#TokenContainer").hide(500);
		$("#qrCode").hide(500);
	});
	
	$('#Mmessage').click(function() {
		$("#TokenContaineriframe").hide()
		$('#Token-iframe').attr('src', "");
		$("#wallet-author").hide(500);
		$("#mobile-wallet").hide(500);
		$("#mobile-music").hide(500);
		$("#mobile-token").hide(500);
		$("#TokenContainer").hide(500);
		$("#mobile-msg").show(500);
		$("#qrCode").hide(500);
	});
	
	$('#Mprofile').click(function() {
		$("#TokenContaineriframe").hide();
		$('#Token-iframe').attr('src', "");
		$("#wallet-author").show(500);
		$("#qrCode").show(500);
		$("#mobile-music").hide(500);
		$("#mobile-wallet").hide(500);
		$("#mobile-token").hide(500);
		$("#mobile-msg").hide(500);
		$("#TokenContainer").hide(500);
	}); 
	
	$('#m-balanceClose').click(function() {
		$(".token-nav").show(500);            
		$(".m-balance ").hide(500);
		window.location.hash = "#modalClosedMenu";
	});   
	
	$('#balance1').click({showTittle: "Let's see how much you can buy!", function: 'Balance', niftyType: "2fa", id: "510efd70-d059-4f86-9763-c8a759e7aa25"}, getNavInfo);
	$('#ListToken').click({showTittle: 'Ready to sell?', function: 'ListToken', niftyType: "2fa", id: "5ebe7c8d-44ce-4cd0-8ffa-8118cb1a7d5f"}, getNavInfo);
	$('#AddFunds').click({showTittle: 'Add Funds', function: 'Add Funds', niftyType: "2fa", id: "813d9c22-cfa2-482f-b2ac-980b31bffc58"}, getNavInfo);
	$('#MyProfile').click({showTittle: "Let's get you updated?", function: 'My Profile', niftyType: "2fa", id: "a0e32047-fd1d-4109-bb98-5d08e2e6276e"}, getNavInfo);
	$('#copywallets').click({showTittle: "Get Wallet ID?", function: 'copywallets', niftyType: "copywallets", id: ""}, getNavInfo);
	$("#MsgClose i.fa-times-circle").click(function(){
	$("#MobileMessagedetails").hide()
	$("#MobileMessageList").show();
	$(".nav-section").show();
		window.location.hash = "#modalClosedMessage";
	})
	var login = false;
	function getNavInfo(event){
	
		if(event.data.niftyType == "2fa") {
			var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
			var action = event.data.id;
			var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
			var parseToken = JSON.parse(parseLocalStorageToken["value"]);
			var token = parseToken["Token"];
			buyparams.niftyID = event.data.id;
			buyparams.niftyType = event.data.function;
			isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
				if(isdone){
				login = true;
					$("#fulmodalwallet .modal-body").empty();
				console.log(parseLocalStorageAuthorizationToken)
					$("#fulmodalwallet").modal("show");
					$("#fulmodalwallet .modal-body").empty();
					$("#fulmodalwallet .modal-body").html(`<span class="lds-ripple" style="margin:auto; position: absolute;top: 50%;left: 50%;-ms-transform: translateY(-50%, -50%); transform: translateY(-50%, -50%);"><div></div><div></div></span>`);
					$.ajax({
				type: "POST",
				contentType: 'application/json',
				dataType: 'json',
				url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
				data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"105611\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ action +"\"}",
				headers: {
					"Content-type": "application/json", 
					'Authorization': 'Bearer ' + token
				},
				success: function(responseData) {
					if(responseData["status"] == "Good")
					{	
					
						// $("#fulmodalwallet .modal-body").html(`<iframe id="IframeLink" src="" height="200" width="300" title="Iframe Example" style="width:100%;height:91vh"></iframe>`);
						// $('#IframeLink').attr('src', responseData["response"])
						if(event.data.id == "a0e32047-fd1d-4109-bb98-5d08e2e6276e"){
							window.location.href = responseData["response"];
						} else {
							$("#fulmodalwallet .modal-body").html('<object id="IframeLink" data="'+responseData["response"]+'" style="width:100%;height:91vh">');
						}
					} else {
					$("#fulmodalwallet").modal("hide");
						$("#fulmodalwallet .modal-body").empty();
					}
				}
				});
				}
				if(!isdone){
					login = false;
					$(".token-nav").hide(100);            
					$(".m-balance ").show(500);
					$(".m-balance h1").html(event.data.showTittle);
					$(".m-listOf2faNFTWallet").html("<div style='text-align: center;'>Loading...</div>");
					$("#H2fa-title2").html("");
					$(".m-listOf2faNFTWallet").show();		
					$("#H2fa-Next2").hide();
					$("#H2fa-title2 span").val("");
					$("#btn-copy-clipboard2").hide();
					$("#btn-next-one2").show();		
					$("#btn-back-one2").hide();		
					$("#btn-next-two2").hide();	
					getListof2FA2();
				}
			});
			
			
		}
		if(event.data.niftyType == "copywallets") {
			$(".token-nav").hide(100);            
			$(".m-balance ").show(500);	
			$("#btn-back-one2").hide();	
			$("#btn-next-one2").hide();	
			$("#btn-next-two2").hide();	
			$("#H2fa-Next2").hide();	
			$("#H2fa-title2").html("");
			$(".m-listOf2faNFTWallet").show();
			$("#btn-copy-clipboard2").show();
			$(".m-balance h1").show();
			$(".m-balance h1").html("Get Wallet ID?");
			copyWalletAddress2();
		}
	
	} // event
	function copyWalletAddress2(){
		const walletAddressHolder = document.createElement("input");
		walletAddressHolder.setAttribute("type", "text");
		walletAddressHolder.setAttribute("id", "walletaddressholder");
		walletAddressHolder.setAttribute("style", "position: absolute;opacity: 0;top: 0px;left: -99999px;");
		document.body.appendChild(walletAddressHolder);	
		var getURL = window.location.href;
		var splitURL = getURL.split("/");
		var walletAddress = splitURL[3].substring(0,36);
		document.getElementById("walletaddressholder").value = walletAddress.toUpperCase();
		$(".m-listOf2faNFTWallet").html('<h5 style="text-align: center;padding: 40px;">'+walletAddress.toUpperCase()+'</h5>');
	}
	
	function getListof2FA2(){
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
	
		$.ajax({
			type: "POST",
			contentType: 'application/json',
			dataType: 'json',
			url: 'https://website.admin.solutions/api/nft/get/list-of-2fa-nft-wallet',
			data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"getNFTTokenUnderWallet\"}",
			headers: {
				"Content-type": "application/json", 
						'Authorization': 'Bearer ' + token
			},
			success: function(responseData) {
					if(responseData["listOf2faNFTWallet"].length == 0){
						$(".modalOpenModal2fa").modal("hide");
				swal({
					title: "No 2FA Found! Please setup 2FA Address!",
					text: "",
					icon: "error"
				})
					}else{
				var HTMLDom2FA = "";
				$.each(responseData["listOf2faNFTWallet"], function(i, val){
				if(responseData["listOf2faNFTWallet"][i]["type"] == "105610"){
					HTMLDom2FA = HTMLDom2FA + `<div class="form-check">
												<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault`+[i]+`" value="`+responseData["listOf2faNFTWallet"][i]["type"]+`">
												<label class="form-check-label" for="flexRadioDefault`+[i]+`">`+responseData["listOf2faNFTWallet"][i]["countryCode"]+responseData["listOf2faNFTWallet"][i]["address"]+` - sms</label>
											</div>`
				}
				if(responseData["listOf2faNFTWallet"][i]["type"] == "105611"){
					HTMLDom2FA = HTMLDom2FA + `<div class="form-check">
												<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault`+[i]+`" value="`+responseData["listOf2faNFTWallet"][i]["type"]+`">
												<label class="form-check-label" for="flexRadioDefault`+[i]+`">`+responseData["listOf2faNFTWallet"][i]["address"]+` - email</label>
												</div>`
				}
				if(responseData["listOf2faNFTWallet"][i]["type"] == "105614"){
					HTMLDom2FA = HTMLDom2FA + `<div class="form-check">
												<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault`+[i]+`" value="`+responseData["listOf2faNFTWallet"][i]["type"]+`">
												<label class="form-check-label" for="flexRadioDefault`+[i]+`">`+responseData["listOf2faNFTWallet"][i]["countryCode"]+responseData["listOf2faNFTWallet"][i]["address"]+` - whatsapp</label>
											</div>`
				}
				});
				$(".m-listOf2faNFTWallet").html(HTMLDom2FA);
					}
			}
		});	
	}
	
	$("#btn-copy-clipboard2").click(function(){
		var copyText = document.getElementById("walletaddressholder");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(copyText.value);	
		swal({
			title:"Wallet Address Copied!",
			//text:"Wallet Address Copied!",
			buttons: {
				confirm : {text:'Close',className:'btn'}
			},
			icon:"success"
		});
	});
	
	$("#btn-next-one2").click(function(){
		var checkSelected = false;
		$.each($("input[name=flexRadioDefault]") , function(i, val){
			if($("input[name=flexRadioDefault]:checked").val() != undefined){
				checkSelected = true;
				$("#H2fa-Next2").html("<input id=\"H2fa-type2\" type='hidden' value='"+$("input[name=flexRadioDefault]:checked").val()+"'><input id=\"H2FA-input-address2\" type=\"text\" value=\"\" style=\"padding:10px 15px;width:100%;\" placeholder=\"Enter your address!.\"><span style='display: block;padding: 15px 20px; text-align: center; background: #4231c0; color: white; font-size: 14px;font-size: 14px;margin-top: 10px;margin-bottom: 0px;'>YOUR TWO FACTOR AUTHENTICATION</span><span style='display: block;margin-bottom:10px; background: #1f1f2066; padding: 24px 0px; color: #939393; text-align: center; font-size: 20px; font-weight: 500; box-shadow: 3px 3px 7px #cbcbcb12;'>"+$("input[name=flexRadioDefault]:checked").closest('.form-check').find("label").html()+"</span>");
			}
		});
		if(checkSelected == true){
			if($("#H2fa-type2").val() == "105614"){
				$("#H2fa-title2").html("Enter your WHATSAPP!");
				$("#H2FA-input-address2").attr("placeholder","Enter your WHATSAPP here!");
			}else if($("#H2fa-type2").val() == "105610"){
				$("#H2fa-title2").html("Enter your SMS!");
				$("#H2FA-input-address2").attr("placeholder","Enter your SMS here!");
			}else if($("#H2fa-type2").val() == "105611"){
				$("#H2fa-title2").html("Enter Your Email!");
				$("#H2FA-input-address2").attr("placeholder","Enter your EMAIL here!");
			}
			$(".m-listOf2faNFTWallet").hide();		
			$("#H2fa-Next2").show();		
			$("#btn-copy-clipboard2").hide();
			$("#btn-next-one2").hide();		
			$("#btn-back-one2").show();		
			$("#btn-next-two2").show();		
		}else{
			swal("Please select 2FA...")
		}
	});
	$("#btn-back-one2").click(function(){
	$(".m-listOf2faNFTWallet").show();
	$("#H2fa-Next2").hide();
	$("#btn-copy-clipboard2").hide();
	$("#btn-next-one2").show();
	$("#btn-back-one2").hide();
	$("#btn-next-two2").hide();
	$("#H2fa-title2").html("");
	});
	$("#btn-next-two2").click(function(){
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];	
		
		$("#H2fa-Next2").hide();
		
		$("#btn-back-one2").hide();
		$("#btn-next-two2").hide();
		
		$("#H2fa-title").html("<span style='text-align: center;padding: 35px 0px;font-size: 18px;text-transform: lowercase;'>Processing...</p>");
		
		var status = "bad";
		$.ajax({
			type: "POST",
			contentType: 'application/json',
			dataType: 'json',
			url: 'https://website.admin.solutions/api/websiteapi/validation/authorize-request',
			data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\""+$("#H2fa-type2").val()+"\",\"input\":\""+$("#H2FA-input-address2").val()+"\",\"action\":\""+buyparams.niftyID+"\"}",
			headers: {
				"Content-type": "application/json", 
				'Authorization': 'Bearer ' + token
			},
			success: function(responseData) {
				console.log(responseData);
				localStorage.setItem('AuthorizationToken', responseData);
				
				if(responseData == "Invalid request! Please contact admin for help!")
				{
					$("#H2fa-title").html("<span style=\"color: #ff4c4c;\">Incorrect Input!</span>Make sure 2FA Address match");
					$("#H2fa-Next2").show();
					$("#btn-back-one2").show();
					$("#btn-next-two2").show();				
				}
				if(responseData != "Invalid request! Please contact admin for help!") {
					$("#inputAddress").html("We just sent it to "+ $("#H2FA-input-address2").val());
                    loginWalletStatus = true;
					checkLoginStatus();
					TIMELIMIT();
				}
				
			}
		});		
	});
	var closedModalHashStateId = "#home";
	var openModalHashStateId = "#modalOpen";
	window.location.hash = closedModalHashStateId;
	window.addEventListener('hashchange', () => {
		if(window.location.hash == "#modalClosedMenu"){
			$(".token-nav").show(500);            
			$(".m-balance ").hide(500);
			if(login){
				$('#fulmodalwallet').modal('hide');
			} 
			$("#wallet-author").hide(500);
			$("#TokenContaineriframe").hide()
			$('#Token-iframe').attr('src', "");
			$("#mobile-wallet").hide(500);
			$("#mobile-music").hide(500);
			$("#mobile-token").show(500);
			$("#mobile-msg").hide(500);
			$("#TokenContainer").hide(500);
			$("#qrCode").hide(500);
		}
		if(window.location.hash == "#modalClosedMessage"){
			$("#MobileMessagedetails").hide()
			$("#MobileMessageList").show();
			$(".nav-section").show();
			$("#TokenContaineriframe").hide()
			$('#Token-iframe').attr('src', "");
			$("#wallet-author").hide(500);
			$("#mobile-wallet").hide(500);
			$("#mobile-music").hide(500);
			$("#mobile-token").hide(500);
			$("#TokenContainer").hide(500);
			$("#mobile-msg").show(500);
			$("#qrCode").hide(500);
		}
		if(window.location.hash == "#modalClosedTokens"){
			$("#TokenContaineriframe").hide()
			$('#Token-iframe').attr('src', "");
			$("#TokenContainer").show(100);
			$("#mobile-wallet").hide();
			$("#mobile-music").hide();
			$("#mobile-token").hide();
			$("#mobile-msg").hide();
			$("#wallet-author").hide();
			$("#qrCode").hide(); 
		}
		if(window.location.hash == "#home"){
			$("#TokenContaineriframe").hide();
			$('#Token-iframe').attr('src', "");
			$("#wallet-author").show(500);
			$("#qrCode").show(500);
			$("#mobile-music").hide(500);
			$("#mobile-wallet").hide(500);
			$("#mobile-token").hide(500);
			$("#mobile-msg").hide(500);
			$("#TokenContainer").hide(500);
		}
		if(window.location.hash == "#music"){
			$("#TokenContaineriframe").hide()
			$('#Token-iframe').attr('src', "");
			$("#wallet-author").hide(500);
			$("#mobile-wallet").hide(500);
			$("#mobile-music").show(500);
			$("#mobile-token").hide(500);
			$("#mobile-msg").hide(500);
			$("#TokenContainer").hide(500);
			$("#qrCode").hide(500);
		}
		// console.log('The hash has changed!');
	});
		
	$("#btn-next-two2").click(function(){
	  var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
	  var parseToken = JSON.parse(parseLocalStorageToken["value"]);
	  var token = parseToken["Token"];	
	  
	  $("#H2fa-Next").hide();
	  
	  $("#btn-back-one2").hide();
	  $("#btn-next-two2").hide();
	  
	  $("#H2fa-title2").html("<span style='text-align: center;padding: 35px 0px;font-size: 18px;text-transform: lowercase;'>Processing...</p>");
	  
	  var status = "bad";
	  $.ajax({
		type: "POST",
		contentType: 'application/json',
		dataType: 'json',
		url: 'https://website.admin.solutions/api/websiteapi/validation/authorize-request',
		data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\""+$("#H2fa-type").val()+"\",\"input\":\""+$("#H2FA-input-address2").val()+"\",\"action\":\""+$("#H2fa-action-process").val()+"\"}",
		headers: {
			"Content-type": "application/json", 
			'Authorization': 'Bearer ' + token
		},
		success: function(responseData) {
		  console.log(responseData);
		  localStorage.setItem('AuthorizationToken', responseData);
		  
		  if(responseData == "Invalid request! Please contact admin for help!")
		  {
			  $("#H2fa-title2").html("<span style=\"color: #ff4c4c;\">Incorrect Input!</span>Make sure 2FA Address match");
			  $("#H2fa-Next2").show();
			  $("#btn-back-one2").show();
			  $("#btn-next-two2").show();				
		  }
		  if(responseData != "Invalid request! Please contact admin for help!") {
			  $("#inputAddress").html("We just sent it to "+ $("#H2FA-input-address2").val());
			  TIMELIMIT();
		  }
				  
		}
	  });		
	});
	$("input#search-token-item").click(function() {
        $('html, body').animate({
            scrollTop: $("#search-token-items").offset().top - 75
        }, 500);
        $("input#search-token-item").focus();
    });
    $(".select select#Listings").hide();
    $(".nftTokenList").show();
    $(".nftTokenMusicList").hide();
    $('select#Listings').on('change', function() {
        if (this.value == "music") {
            $(".nftTokenList").hide();
            $(".nftTokenMusicList").show();
            $("#search-token-item").closest("div").fadeOut(500);
        } else if (this.value == "image") {
            $(".nftTokenList").show();
            $(".nftTokenMusicList").hide();
            $("#search-token-item").closest("div").fadeIn(500);
        }
    });
    $('div#Wview').on('click', function() {
        $(".pagination").show();
        $(".nftTokenList").show();
        $(".nftTokenMusicList").hide();
        $("#search-token-item").closest("div").fadeIn(500);
    })
    $('div#MPview').on('click', function() {
        $(".pagination").hide();
        $(".nftTokenList").hide();
        $(".nftTokenMusicList").show();
        $("#search-token-item").closest("div").fadeOut(500);
    })
    $(".niftyMenuOpen").click(function(){	
        $(".niftyMenu").css("background","rgba(0,0,0,0.8)");
        $(".niftyMenuList").show(500,function() {
             var $elem = $('.niftyMenuOpen');
            $({deg: 0}).animate({deg: 180}, {
                duration: 100,
                step: function(now) {
                    $elem.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
        });
        $(".niftyMenuClose").removeClass("niftyHide");
        $(".niftyMenuList").removeClass("niftyHide");
        $(".niftyMenuOpen").addClass("niftyHide");	
        checkLoginStatus();
    });
    $(".niftyMenuClose").click(function(){
        $(".niftyMenu").css("background","rgba(0,0,0,0.0)");
        $(".niftyMenuClose").addClass("niftyHide");
        $(".niftyMenuList").addClass("niftyHide");
        $(".niftyMenuOpen").removeClass("niftyHide");	
        $(".niftyMenuList").hide(500,function() {
             var $elem = $('.niftyMenuOpen');
            $({deg: -180}).animate({deg: 0}, {
                duration: 300,
                step: function(now) {
                    $elem.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
        });		
    });
    $("#qrCode").click(function(){
        $('#qrCodeModal').modal('show');
    });

    $(".VCardQR").dblclick(function(){
		$('#VCardQRModal').modal('show');
    });	

	$(".WalletLinkQR").dblclick(function(){
		$('#WalletLinkQRModal').modal('show');
    });	

	$(".GetWalletQR").dblclick(function(){
		$('#GetReferralQRModal').modal('show');
    });	

    $("#walletLogout").click(function(){
        confirmLogout();
    });	

	$("#walletLogouts").click(function(){
        confirmLogout();
    });	
    
	// BALANCES
	$(".niftyMenu #510efd70-d059-4f86-9763-c8a759e7aa25").click(function(e){

		var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
		var action = e.target.id;
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		buyparams.niftyID = "510efd70-d059-4f86-9763-c8a759e7aa25";
		buyparams.niftyType = "Balances";
        isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
        	if(isdone){
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet").modal("show");
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet .modal-body").html(`<span class="lds-ripple" style="margin:auto; position: absolute;top: 50%;left: 50%;-ms-transform: translateY(-50%, -50%); transform: translateY(-50%, -50%);"><div></div><div></div></span>`);
        		 $.ajax({
					type: "POST",
					contentType: 'application/json',
					dataType: 'json',
					url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
					data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"105611\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ action +"\"}",
					headers: {
						"Content-type": "application/json", 
						'Authorization': 'Bearer ' + token
					},
					success: function(responseData) {
						if(responseData["status"] == "Good")
						{	
							
							$("#fulmodalwallet .modal-body").html(`<iframe id="IframeLink" src="" height="200" width="300" title="Iframe Example" style="width:100%;height:91vh"></iframe>`);
							$('#IframeLink').attr('src', responseData["response"])
							// $("#H2fa-body-title").html(buyparams.niftyType)
							// $(".modalOpenModal2fa").modal("show");
							// $("#H2fa-container").html(`<center><button class="btn" onclick="openNifty('`+responseData["response"]+`');">Open `+buyparams.niftyType+`</button><br><i style="">Successfully authorized you can now click the button to open the link!</i></center>`);
							// $("#H2fa-action").html("");

						} else {
							$("#fulmodalwallet").modal("hide");
        					$("#fulmodalwallet .modal-body").empty();
						}
					}
				});
        	}
        	if(!isdone){
        		$("#H2fa-body-title").html("Let's see how much you can buy!");
				$("#btn-next-one").hide();	
				$("#btn-next-two").hide();	
				$("#btn-back-one").hide();	
				$("#btn-back-two").hide();		
				$("#btn-copy-clipboard").hide();		
				$(".modalOpenModal2fa").modal("show");
				$("#H2fa-container").html("<div style='text-align: center;'>Loading...</div>");
				getListof2FA($(this).attr("id"));
        	}
        });
	});
	// LIST TOKEN
	$("#5ebe7c8d-44ce-4cd0-8ffa-8118cb1a7d5f").click(function(e){
		var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
		var action = e.target.id;
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		buyparams.niftyID = "5ebe7c8d-44ce-4cd0-8ffa-8118cb1a7d5f";
		buyparams.niftyType = "List Token";
        isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
        	if(isdone){
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet").modal("show");
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet .modal-body").html(`<span class="lds-ripple" style="margin:auto; position: absolute;top: 50%;left: 50%;-ms-transform: translateY(-50%, -50%); transform: translateY(-50%, -50%);"><div></div><div></div></span>`);
        		 $.ajax({
					type: "POST",
					contentType: 'application/json',
					dataType: 'json',
					url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
					data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"105611\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ action +"\"}",
					headers: {
						"Content-type": "application/json", 
						'Authorization': 'Bearer ' + token
					},
					success: function(responseData) {
						if(responseData["status"] == "Good")
						{	
							
							$("#fulmodalwallet .modal-body").html(`<iframe id="IframeLink" src="" height="200" width="300" title="Iframe Example" style="width:100%;height:91vh"></iframe>`);
							$('#IframeLink').attr('src', responseData["response"]);

						} else {
							$("#fulmodalwallet").modal("hide");
        					$("#fulmodalwallet .modal-body").empty();
						}
					}
				});
        	}
        	if(!isdone){
        		$("#H2fa-body-title").html("Ready to sell?");	
				$("#btn-next-one").hide();	
				$("#btn-next-two").hide();	
				$("#btn-back-one").hide();	
				$("#btn-back-two").hide();		
				$("#btn-copy-clipboard").hide();		
				$("#H2fa-container").html("<div style='text-align: center;'>Loading...</div>");
				getListof2FA($(this).attr("id"));
				$(".modalOpenModal2fa").modal("show");
				/*$("#H2fa-container").html('<h5 style="text-align: center;padding: 40px;">Coming soon...</h5>');*/
        	}
        });
			
	});
	// BUY TOKEN
	$("#edb3e42b-f989-443d-bf34-282b0a733055").click(function(){
		$("#H2fa-body-title").html("Marketplaces");
		$("#H2fa-title").html("");		
		$("#btn-next-one").hide();	
		$("#btn-next-two").hide();	
		$("#btn-back-one").hide();	
		$("#btn-back-two").hide();		
		$("#btn-copy-clipboard").hide();		
		/*$("#H2fa-container").html("<div style='text-align: center;'>Loading...</div>");
		getListof2FA($(this).attr("id"));*/
		$(".modalOpenModal2fa").modal("show");
		getListOfMarketplaces("","","1","10");
	});
	// ADD FUNDS
	$("#813d9c22-cfa2-482f-b2ac-980b31bffc58").click(function(e){
		var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
		var action = e.target.id;
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		buyparams.niftyID = "813d9c22-cfa2-482f-b2ac-980b31bffc58";
		buyparams.niftyType = "Add Funds";
        isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
        	if(isdone){
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet").modal("show");
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet .modal-body").html(`<span class="lds-ripple" style="margin:auto; position: absolute;top: 50%;left: 50%;-ms-transform: translateY(-50%, -50%); transform: translateY(-50%, -50%);"><div></div><div></div></span>`);
        		 $.ajax({
					type: "POST",
					contentType: 'application/json',
					dataType: 'json',
					url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
					data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"105611\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ action +"\"}",
					headers: {
						"Content-type": "application/json", 
						'Authorization': 'Bearer ' + token
					},
					success: function(responseData) {
						if(responseData["status"] == "Good")
						{	
							
							$("#fulmodalwallet .modal-body").html(`<iframe id="IframeLink" src="" height="200" width="300" title="Iframe Example" style="width:100%;height:91vh"></iframe>`);
							$('#IframeLink').attr('src', responseData["response"]);

						} else {
							$("#fulmodalwallet").modal("hide");
        					$("#fulmodalwallet .modal-body").empty();
						}
					}
				});
        	}
        	if(!isdone){
        		$("#H2fa-body-title").html("Add Funds!");
				$("#H2fa-title").html("");		
				$("#btn-next-one").hide();	
				$("#btn-next-two").hide();	
				$("#btn-back-one").hide();	
				$("#btn-back-two").hide();		
				$("#btn-copy-clipboard").hide();		
				$("#H2fa-container").html("<div style='text-align: center;'>Loading...</div>");
				getListof2FA($(this).attr("id"));
				$(".modalOpenModal2fa").modal("show");
        	}
        });
				
	});
	// SEND FUNDS
	$("#361b79e2-9d90-4ad9-87c5-4e5fe8bd7994").click(function(){
		$("#H2fa-body-title").html("Send Funds!");	
		$("#btn-next-one").hide();	
		$("#btn-next-two").hide();	
		$("#btn-back-one").hide();	
		$("#btn-back-two").hide();		
		$("#btn-copy-clipboard").hide();		
		/*$("#H2fa-container").html("<div style='text-align: center;'>Loading...</div>");
		getListof2FA($(this).attr("id"));*/
		$(".modalOpenModal2fa").modal("show");
		$("#H2fa-container").html('<h5 style="text-align: center;padding: 40px;">Coming soon...</h5>');
	});
	// MY PROFILE
	$("#a0e32047-fd1d-4109-bb98-5d08e2e6276e").click(function(e){
		var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
		var action = e.target.id;
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		buyparams.niftyID = "a0e32047-fd1d-4109-bb98-5d08e2e6276e";
		buyparams.niftyType = "Update Profile";
        isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
        	if(isdone){
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet").modal("show");
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet .modal-body").html(`<span class="lds-ripple" style="margin:auto; position: absolute;top: 50%;left: 50%;-ms-transform: translateY(-50%, -50%); transform: translateY(-50%, -50%);"><div></div><div></div></span>`);
        		 $.ajax({
					type: "POST",
					contentType: 'application/json',
					dataType: 'json',
					url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
					data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"105611\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ action +"\"}",
					headers: {
						"Content-type": "application/json", 
						'Authorization': 'Bearer ' + token
					},
					success: function(responseData) {
						if(responseData["status"] == "Good")
						{	
							window.location.href = responseData["response"];
							// $("#fulmodalwallet .modal-body").html(`<iframe id="IframeLink" src="" height="200" width="300" title="Iframe Example" style="width:100%;height:91vh"></iframe>`);
							// $('#IframeLink').attr('src', responseData["response"]);

						} else {
							$("#fulmodalwallet").modal("hide");
        					$("#fulmodalwallet .modal-body").empty();
						}
					}
				});
        	}
        	if(!isdone){
        		$("#H2fa-body-title").html("Let's get you updated?");			
				$("#btn-next-one").hide();	
				$("#btn-next-two").hide();	
				$("#btn-back-one").hide();	
				$("#btn-back-two").hide();		
				$("#btn-copy-clipboard").hide();
				$(".modalOpenModal2fa").modal("show");
				$("#H2fa-container").html('<h5 style="text-align: center;padding: 40px;">Coming soon...</h5>');
				getListof2FA($(this).attr("id"));
				$(".modalOpenModal2fa").modal("show");
        	}
        });
	});
	// MY LISTINGS
	$("#becc8f53-4880-4eaf-a0af-427cf7c00ac0").click(function(){
		$("#H2fa-body-title").html("Need to revise your listings?");		
		$("#btn-next-one").hide();	
		$("#btn-next-two").hide();	
		$("#btn-back-one").hide();	
		$("#btn-back-two").hide();	
		$("#btn-copy-clipboard").hide();	
		/*$("#H2fa-container").html("<div style='text-align: center;'>Loading...</div>");
		getListof2FA($(this).attr("id"));*/
		$(".modalOpenModal2fa").modal("show");
		$("#H2fa-container").html('<h5 style="text-align: center;padding: 40px;">Coming soon...</h5>');
	});
	// GET WALLET ID
	$("#copywallet").click(function(){
		$("#H2fa-body-title").html("Get Wallet ID?");		
		$("#btn-next-one").hide();	
		$("#btn-next-two").hide();	
		$("#btn-back-one").hide();	
		$("#btn-back-two").hide();		
		$("#btn-copy-clipboard").show();	
		$(".modalOpenModal2fa").modal("show");
		copyWalletAddress();
	});
	function getListof2FA(id){
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
	
		var h2fa_title = "";
		if(id == "510efd70-d059-4f86-9763-c8a759e7aa25")// BALANCES
		{
			h2fa_title = "Tell us how to contact you to get this party started!";
		}
		else if(id == "5ebe7c8d-44ce-4cd0-8ffa-8118cb1a7d5f")// LIST TOKEN
		{
			h2fa_title = "Tell us how to contact you so we can Rock n Roll!";
		}
		else if(id == "edb3e42b-f989-443d-bf34-282b0a733055")// BUY TOKEN
		{
			h2fa_title = "";
		}
		else if(id == "361b79e2-9d90-4ad9-87c5-4e5fe8bd7994")// SEND FUNDS
		{
			h2fa_title = "";
		}
		else if(id == "813d9c22-cfa2-482f-b2ac-980b31bffc58")// ADD FUNDS
		{
			h2fa_title = "Add Funds!";
		}
		else if(id == "a0e32047-fd1d-4109-bb98-5d08e2e6276e")// MY PROFILE
		{
			h2fa_title = "Tell us how to contact you so we can get this show on the road";
		}
		else if(id == "becc8f53-4880-4eaf-a0af-427cf7c00ac0")// MY LISTINGS
		{
			h2fa_title = "Tell us how to contact you so we can add the finishing touch!";
		}
		
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://website.admin.solutions/api/nft/get/list-of-2fa-nft-wallet',
            data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"getNFTTokenUnderWallet\"}",
            headers: {
                "Content-type": "application/json", 
				'Authorization': 'Bearer ' + token
            },
            success: function(responseData) {
				if(responseData["listOf2faNFTWallet"].length == 0){
					$(".modalOpenModal2fa").modal("hide");
                    swal({
                        title: "No 2FA Found! Please setup 2FA Address!",
                        text: "",
                        icon: "error"
                    })
				}else{
					var HTMLDom2FA = "";
					HTMLDom2FA = "<h5 id=\"H2fa-title\">"+h2fa_title+"</h5><input id=\"H2fa-action-process\" type=\"hidden\" value=\""+id+"\"/><table id=\"H2fa-table\"><tbody>";
					$.each(responseData["listOf2faNFTWallet"], function(i, val){
						var trtd2fa = "";
						if(trtd2fa == ""){
							if(responseData["listOf2faNFTWallet"][i]["type"] == "105610"){
								trtd2fa = "<tr><td class=\"H2fa-td-1\"><input type=\"radio\" value=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\" name=\"2fa\"></td><td class=\"H2fa-td-2\"><label for=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\">"+responseData["listOf2faNFTWallet"][i]["countryCode"]+responseData["listOf2faNFTWallet"][i]["address"]+" - sms"+"</label></td></tr>";
							}
							if(responseData["listOf2faNFTWallet"][i]["type"] == "105611"){
								trtd2fa = "<tr><td class=\"H2fa-td-1\"><input type=\"radio\" value=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\" name=\"2fa\"></td><td class=\"H2fa-td-2\"><label for=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\">"+responseData["listOf2faNFTWallet"][i]["address"]+" - email"+"</label></td></tr>";
							}
							if(responseData["listOf2faNFTWallet"][i]["type"] == "105614"){
								trtd2fa = "<tr><td class=\"H2fa-td-1\"><input type=\"radio\" value=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\" name=\"2fa\"></td><td class=\"H2fa-td-2\"><label for=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\">"+responseData["listOf2faNFTWallet"][i]["countryCode"]+responseData["listOf2faNFTWallet"][i]["address"]+" - whatsapp"+"</label></td></tr>";
							}
						}else{
							if(responseData["listOf2faNFTWallet"][i]["type"] == "105610"){
								trtd2fa = trtd2fa + "<tr><td class=\"H2fa-td-1\"><input type=\"radio\" value=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\" name=\"2fa\"></td><td class=\"H2fa-td-2\"><label for=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\">"+responseData["listOf2faNFTWallet"][i]["countryCode"]+responseData["listOf2faNFTWallet"][i]["address"]+" - sms"+"</label></td></tr>";
							}
							if(responseData["listOf2faNFTWallet"][i]["type"] == "105611"){
								trtd2fa = trtd2fa + "<tr><td class=\"H2fa-td-1\"><input type=\"radio\" value=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\" name=\"2fa\"></td><td class=\"H2fa-td-2\"><label for=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\">"+responseData["listOf2faNFTWallet"][i]["address"]+" - email"+"</label></td></tr>";
							}
							if(responseData["listOf2faNFTWallet"][i]["type"] == "105614"){
								trtd2fa = trtd2fa + "<tr><td class=\"H2fa-td-1\"><input type=\"radio\" value=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\" name=\"2fa\"></td><td class=\"H2fa-td-2\"><label for=\""+responseData["listOf2faNFTWallet"][i]["type"]+"\">"+responseData["listOf2faNFTWallet"][i]["countryCode"]+responseData["listOf2faNFTWallet"][i]["address"]+" - whatsapp"+"</label></td></tr>";
							}
						}
						HTMLDom2FA = HTMLDom2FA + trtd2fa;
					});
					HTMLDom2FA = HTMLDom2FA + "</tbody></table><div id=\"H2fa-Next\">next</div><div id=\"H2fa-Validate\">next</div>";
					$("#H2fa-container").html(HTMLDom2FA);
					$("#H2fa-Next").hide();	
					$("#H2fa-Validate").hide();	
					$("#btn-next-two").hide();	
					$("#btn-back-one").hide();	
					$("#btn-next-one").show();
					$("#btn-back-two").hide();
				}
			}
		});	
	}
	function copyWalletAddress(){
		const walletAddressHolder = document.createElement("input");
		walletAddressHolder.setAttribute("type", "text");
		walletAddressHolder.setAttribute("id", "walletaddressholder");
		walletAddressHolder.setAttribute("style", "position: absolute;opacity: 0;top: 0px;left: -99999px;");
		document.body.appendChild(walletAddressHolder);	
		var getURL = window.location.href;
		var splitURL = getURL.split("/");
		var walletAddress = splitURL[3].substring(0,36);
		document.getElementById("walletaddressholder").value = walletAddress.toUpperCase();
		$("#H2fa-container").html('<h5 style="text-align: center;padding: 40px;">'+walletAddress.toUpperCase()+'</h5>');
	}
    $("#H2fa-action #btn-next-one").click(function(){
        var checkSelected = false;
        $.each($("input[name=2fa]") , function(i, val){
            if($("input[name=2fa]:checked").val() != undefined){
                checkSelected = true;
                $("#H2fa-Next").html("<input id=\"H2fa-type\" type='hidden' value='"+$("input[name=2fa]:checked").val()+"'><input id=\"H2FA-input-address\" type=\"text\" value=\"\" style=\"padding:10px 15px;width:100%;\" placeholder=\"Enter your address!.\"><span style='padding: 15px 20px; text-align: center; background: #4231c0; color: white; font-size: 14px;font-size: 14px;margin-top: 30px;margin-bottom: 0px;'>YOUR TWO FACTOR AUTHENTICATION</span><span style='background: #8f80ff; padding: 24px 0px; color: black; text-align: center; font-size: 24px; font-weight: 500;'>"+$("input[name=2fa]:checked").closest('tr').find("td:nth-child(2) label").html()+"</span>");
            }
        });
        if(checkSelected == true){
            if($("#H2fa-type").val() == "105614"){
                $("#H2fa-title").html("Enter your WHATSAPP!");
                $("#H2FA-input-address").attr("placeholder","Enter your WHATSAPP here!");
            }else if($("#H2fa-type").val() == "105610"){
                $("#H2fa-title").html("Enter your SMS!");
                $("#H2FA-input-address").attr("placeholder","Enter your SMS here!");
            }else if($("#H2fa-type").val() == "105611"){
                $("#H2fa-title").html("Enter your EMAIL!");
                $("#H2FA-input-address").attr("placeholder","Enter your EMAIL here!");
            }else{
                $("#H2fa-title").html("Enter your ADDRESS");
                $("#H2FA-input-address").attr("placeholder","Enter your ADDRESS here!");
            }
            $("#H2fa-table").hide();		
            $("#H2fa-Next").show();		
            $("#btn-next-one").hide();		
            $("#btn-back-one").show();		
            $("#btn-next-two").show();		
        }else{
            swal("Please select 2FA...")
        }
    });
    $("#H2fa-action #btn-back-one").click(function(){
        $("#H2fa-title").html("Tell us how to contact you to get this party started!");
        $("#H2fa-table").show();		
        $("#H2fa-Next").hide();		
        $("#H2fa-Validate").hide();		
        $("#btn-next-one").show();		
        $("#btn-back-one").hide();		
        $("#btn-next-two").hide();	
        
        $("#btn-back-two").hide();	
    });
    $("#H2fa-action #btn-next-two").click(function(){
        var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
        var parseToken = JSON.parse(parseLocalStorageToken["value"]);
        var token = parseToken["Token"];	
        
        $("#H2fa-Next").hide();
        
        $("#btn-back-one").hide();
        $("#btn-next-two").hide();
        
        $("#H2fa-title").html("<span style='text-align: center;padding: 35px 0px;font-size: 18px;text-transform: lowercase;'>Processing...</p>");
        
        var status = "bad";
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://website.admin.solutions/api/websiteapi/validation/authorize-request',
            data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\""+$("#H2fa-type").val()+"\",\"input\":\""+$("#H2FA-input-address").val()+"\",\"action\":\""+$("#H2fa-action-process").val()+"\"}",
            headers: {
                "Content-type": "application/json", 
                'Authorization': 'Bearer ' + token
            },
            success: function(responseData) {
                console.log(responseData);
                localStorage.setItem('AuthorizationToken', responseData);
               
                if(responseData == "Invalid request! Please contact admin for help!")
                {
                    $("#H2fa-title").html("<span style=\"color: #ff4c4c;\">Incorrect Input!</span>Make sure 2FA Address match");
                    $("#H2fa-Next").show();
                    $("#btn-back-one").show();
                    $("#btn-next-two").show();				
                }
                if(responseData != "Invalid request! Please contact admin for help!") {
                    $("#inputAddress").html("We just sent it to "+ $("#H2FA-input-address").val());
                    TIMELIMIT();
                }
                
            }
        });		
    });
    $("#H2fa-action #btn-back-two").click(function(){
        $("#H2fa-title").html("Enter your ADDRESS!");
        $("#H2fa-table").show();		
        $("#H2fa-Next").hide();		
        $("#H2fa-Validate").hide();		
        $("#btn-next-one").show();		
        $("#btn-back-one").hide();		
        $("#btn-next-two").hide();	
        
        $("#btn-back-two").hide();	
    });
    $("#H2fa-action #btn-copy-clipboard").click(function(){
        var copyText = document.getElementById("walletaddressholder");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);	
        swal({
            title:"Wallet Address Copied!",
            //text:"Wallet Address Copied!",
            buttons: {
                confirm : {text:'Close',className:'btn'}
            },
            icon:"success"
        });
    });

	function TIMELIMIT() {
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		TIME_LIMIT = 120;
		timeLeft = TIME_LIMIT;
		timePassed = 0;
		document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
		$("#exampleModalToggle").modal('show');
		$(".modalOpenModal2fa").modal("hide");
		var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
		var pmc = $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content');
		startTimer();
		var isvaledchecking = setInterval(function() {
			parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
			isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
				if(isdone){
					$("#fulmodalwallet .modal-body").empty();
					$("#fulmodalwallet").modal("show");
					$("#fulmodalwallet .modal-body").empty();
					$("#fulmodalwallet .modal-body").html(`<span class="lds-ripple" style="margin:auto; position: absolute;top: 50%;left: 50%;-ms-transform: translateY(-50%, -50%); transform: translateY(-50%, -50%);"><div></div><div></div></span>`);
					clearInterval(isvaledchecking);
					$.ajax({
						type: "POST",
						contentType: 'application/json',
						dataType: 'json',
						url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
						data: "{\"pmc\":\"" + pmc + "\",\"type\":\"105611\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ buyparams.niftyID +"\"}",
						headers: {
							"Content-type": "application/json", 
							'Authorization': 'Bearer ' + token
						},
						success: function(responseData) {
							if(responseData["status"] == "Good")
							{
								login = true;
								initVcardQR();
								if(buyparams.niftyType == "Update Profile"){
									window.location.href = responseData["response"];
								} else {
									
									$("#fulmodalwallet .modal-body").html('<object id="IframeLink" data="'+responseData["response"]+'" style="width:100%;height:91vh">');
									// $("#fulmodalwallet .modal-body").html(`<iframe id="IframeLink" src="" height="200" width="300" title="Iframe Example" style="width:100%;height:91vh"></iframe>`);
									// $('#IframeLink').attr('src', responseData["response"]);
									$("#exampleModalToggle").modal('hide');
								}
							} else {
								$("#fulmodalwallet").modal("hide");
								$("#fulmodalwallet .modal-body").empty();
							}
						}
					});
				}
				if(timeLeft == 0) {
					clearInterval(isvaledchecking);
					$("#exampleModalToggle").modal('hide');
				}
			});
		}, 2000);
	}
	
})
function initNFTListForWallet(){
	$('#TokenContainer').empty();
	var loc = document.querySelector("#wallet-author");
	exarchaAppendElement(loc, niftyMenuStyle);
	exarchaAppendElement(loc, niftyMenuDiv);
	exarchaAppendElement(loc, niftymodalOpenModal2fa);
	$("body").append(footerModal);
	$("#TokenContainer").append(TokenContainer);
	$("#wallet-author").append(walletAuthor);
	
	var  isMove = false;
	var swiper = new Swiper(".mySwiper", {
		loop: true,
		speed:800,
		autoplay:{
			delay:3000
		},
		shadowOpacity: 0,
		shadowColor: "transparent",
		effect: 'cube', // 'cube', 'fade', 'coverflow',
		cubeEffect: {
			shadow: false,
			slideShadows: false,
			shadowOffset: 40,
			shadowScale: 0.94,
		},
		grabCursor: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		// Events
		on: {
			init: function(){
			this.autoplay.stop();
			},
			imagesReady: function(){
			this.el.classList.remove('loading');
			//   this.autoplay.start();
			},
			touchMove: function(event){
			if (!isMove) {
				this.el.classList.remove('scale-in');
				this.el.classList.add('scale-out');
				isMove = true;
			}
			},
			touchEnd: function(event){
			this.el.classList.remove('scale-out');
			this.el.classList.add('scale-in');
			setTimeout(function(){
				isMove = false;
			}, 300);
			},
			slideChangeTransitionStart: function(){
			if (!isMove) {
				this.el.classList.remove('scale-in');
				this.el.classList.add('scale-out');
			}
			},
			slideChangeTransitionEnd: function(){
			if (!isMove) {
				this.el.classList.remove('scale-out');
				this.el.classList.add('scale-in');
			}
			},
			transitionStart: function(){
			},
			transitionEnd: function(){
			},
			slideChange:function(){
				if(this.activeIndex == 0){
					$("#qrCode").hide();
				} else if(this.activeIndex == 2){
					$("#qrCode").hide();
				} else if(this.activeIndex == 3){
					$("#qrCode").hide();
				} else if(this.activeIndex == 4){
					$("#qrCode").hide();
				} else {
					$("#qrCode").show();
				}
			}
		}
	});
	if(($('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') != undefined) || ($('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') != "")){
        document.querySelector("#TokenContainer .nftTokenList").innerHTML = "<span class=\"lds-ripple\"><div></div><div></div></span>";

		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
	
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://website.admin.solutions/api/blockchain/wallet/token-list',
            data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"getNFTTokenUnderWallet\",\"data\":[{\"formid\":\"\",\"meta\":\"\",\"uri\":\"\",\"subject\":\"Subject\"}]}",
            headers: {
                "Content-type": "application/json", 
				'Authorization': 'Bearer ' + token
            },
            success: function(responseData) {
                retrivedObject = responseData;  
                changePage(1);
                var newObj = {};
                for(i in retrivedObject){
                 var item = retrivedObject[i];
                    if(newObj[item["nftcontrolguid"]] === undefined){
                        var finalNameNFT = item["nftnameonnft"];
                        if((finalNameNFT == null)||(finalNameNFT == "")){
                            finalNameNFT = item["nftname"];
                        }
                        if(item["assetAudio"] != "" && item["assetAudio"] != null && item["assetAudio"] != undefined){
                            newObj[item["nftcontrolguid"]] = {"audio":item["assetAudio"]+"?NFTToken="+item["nftguid"],"title":finalNameNFT};
                        }
                    }
                }
                nextplay = Object.keys(newObj).length -1;
				nextplayM = Object.keys(newObj).length -1;
                if(Object.keys(newObj).length == 0) {
                    $("div#MPview").hide();
					$("#Mmusic").hide();
                } else {
                    $("div#MPview").show();
					$("#Mmusic").show();
                }
                var ii = 0;
                var htmlsonglist = "";
				var htmlsonglist2 = "";
                for(i in newObj){
					
                    urls.push({"audio":newObj[i]["audio"],"guid":i,"title":newObj[i]["title"]});
                    if(htmlsonglist == ""){
                        htmlsonglist = '<div id="p-list" class="pickSong'+ii+'" onclick="pickSong('+ii+')"><div><span>'+(ii+1)+'</span><span>'+newObj[i]["title"]+'</span></div></div>';
						htmlsonglist2 =`<div class="pickSong`+ii+`"  onclick="pickSongM(`+ii+`)"><span style="margin-right: 15px;margin-left: 6px;">`+(ii+1)+`</span><span class="pickSong`+ii+`">`+newObj[i]["title"]+`</span></div>`;
                    }else{
                        htmlsonglist = htmlsonglist + '<div id="p-list" class="pickSong'+ii+'" onclick="pickSong('+ii+')"><div><span>'+(ii+1)+'</span><span>'+newObj[i]["title"]+'</span></div></div>';
						htmlsonglist2 = htmlsonglist2 + `<div class="pickSong`+ii+`" onclick="pickSongM(`+ii+`)"><span style="margin-right: 15px; margin-left: 6px;">`+(ii+1)+`</span><span class="pickSong`+ii+`">`+newObj[i]["title"]+`</span></div>`;
					}
                    ii++;
                }
                $("#p-bg").html(htmlsonglist);   
				$(".lyrics").html(htmlsonglist2);
                
            }
        });
        checkForChanges();
        $("#modalCardWithHandler").val("1060");
    }	
}

function initVcardQR(){

	var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
	var parseToken = JSON.parse(parseLocalStorageToken["value"]);
	var token = parseToken["Token"];
	var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
	
	$.ajax({
			type: "POST",
			contentType: 'application/json',
			dataType: 'json',
			url: 'https://website.admin.solutions/api/vcard/view/vcard-qr',			
			data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\"}",
			headers: {
				"Content-type": "application/json", 
				'Authorization': 'Bearer ' + token
			},
			success: function(responseData) { //
                if(responseData.vcardQR == null || responseData.vcardQR == "") {
					$('.VCardQR').attr('src','https://image.admin.solutions/not-available/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/c6e292ed-d58e-4ae5-882d-79701f9be5bf');
					$('#ModalVCardQRImg').attr('src', 'https://image.admin.solutions/not-available/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/c6e292ed-d58e-4ae5-882d-79701f9be5bf');
				} else { 
					$('.VCardQR').attr('src',responseData.vcardQR);
					$('#ModalVCardQRImg').attr('src',responseData.vcardQR);
				}
                if(responseData.walletLinkQR == null || responseData.walletLinkQR == "") {
					$('.WalletLinkQR').attr('src','https://image.admin.solutions/not-available/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/c6e292ed-d58e-4ae5-882d-79701f9be5bf');
					$('#ModalWalletLinkQRImg').attr('src','https://image.admin.solutions/not-available/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/c6e292ed-d58e-4ae5-882d-79701f9be5bf');
				}
                else {
					$('.WalletLinkQR').attr('src',responseData.walletLinkQR);
					$('#ModalWalletLinkQRImg').attr('src',responseData.walletLinkQR);
				}
                if(responseData.getwalletreferrerQR == null || responseData.getwalletreferrerQR == ""){
					$('.GetWalletQR').attr('src','https://image.admin.solutions/not-available/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/c6e292ed-d58e-4ae5-882d-79701f9be5bf');
					$('#ModalGetWalletQRImg').attr('src','https://image.admin.solutions/not-available/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/c6e292ed-d58e-4ae5-882d-79701f9be5bf');
				}
                else{
					$('.GetWalletQR').attr('src',responseData.getwalletreferrerQR);
					$('#ModalGetWalletQRImg').attr('src',responseData.getwalletreferrerQR);
				}

				
				
				// $('#WalletOwnershopVerificationQR').attr('src',responseData.walletOwnerVerificationQR);
				
			}
	});	
}
var loginWalletStatus = false;
function initLoginStatus(){
	loginWalletStatus = false;
	var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
	if(parseLocalStorageAuthorizationToken){
		isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){			
			if(isdone == false){
				loginWalletStatus = false;
			}else{
				loginWalletStatus = true;
			}
		});		
	}else{
		loginWalletStatus = false;
	}	
}




function checkLoginStatus(){
	if(loginWalletStatus == false){
		$("#walletLogout").css("display","none");
		$("#walletLogouts").css("display","none");
	}
	if(loginWalletStatus == true){
		$("#walletLogout").css("display","block");
		$("#walletLogouts").css("display","block");
	}
}
function confirmLogout() {
	swal({
	  title: "Are you sure?",
	  text: "You will be disconnected!",
	  icon: "info",
	  dangerMode: false,
	  buttons: ['Cancel','Yes! Disconnect Now!']
	})
	.then((disconnect) => {
	  if (disconnect) {
		swal("Please wait! Disconnecting...", {
		  icon: "info",
		  dangerMode: false,
		  buttons: 'Yes. disconnect now!',
		  closeOnClickOutside: false,
		  closeOnEsc: false,
		  allowOutsideClick: false,
		  buttons: false
		});
		
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];	
		var authorizedToken = localStorage.getItem('AuthorizationToken');	
		
        $.ajax({
            url: "https://website.admin.solutions/api/websiteapi/validation/logout",
            type: "POST",
            data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"authorizedToken\":\""+authorizedToken+"\"}",
            dataType: "json",
			contentType: 'application/json',
			headers: {
				"Content-type": "application/json", 
				'Authorization': 'Bearer ' + token
			},
            success: function (responseData) {
				if(responseData == "true"){
                    initVcardQR();
					loginWalletStatus = false;
					checkLoginStatus();
					swal("Done!", "Succesfully disconnected!", { icon: "success", buttons: "Close"});
				}else{
					loginWalletStatus = true;
					checkLoginStatus();
					swal("Error disconnecting!", "Please try again", "error");
				}
            },
            error: function (xhr, ajaxOptions, thrownError) {
				loginWalletStatus = true;
				checkLoginStatus();
                swal("Error disconnecting!", "Please try again", "error");
            }
        });		
		
	  }
	});
}
function getListOfMarketplaces(keyword, currency, pageNum, pageRow){
	document.getElementById('H2fa-container').innerHTML = '<span class="lds-ripple"><div></div><div></div></span>';
	var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
	var parseToken = JSON.parse(parseLocalStorageToken["value"]);
	var token = parseToken["Token"];
	var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
	var checkIsValidFlag = false;
	isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
		if(isdone){
			checkIsValidFlag = true;
		}
	});		
	$.ajax({
			type: "POST",
			contentType: 'application/json',
			dataType: 'json',
			url: 'https://website.admin.solutions/api/nft/view/nifty-request-marketplaces',			
			data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') 
				+ "\",\"keyword\":\""+keyword+"\",\"currency\":\""+currency+"\",\"pageNum\":\""+pageNum+"\",\"pageRow\":\""+pageRow+"\"}",
			headers: {
				"Content-type": "application/json", 
				'Authorization': 'Bearer ' + token
			},
			success: function(responseData) {
				$("#H2fa-container").html(
					'<section id="nft-marketplace-table">' +
						'<div class="row mt-3">' +
							'<div class="col-md-6 mb-3 d-inline-flex">' +
								'<button id="PageRowDownBuyToken" onclick="DownBuyToken()" style="width:40px;background: #510EB2; color: white;display: inline-block;" class="btn btn-default btn-sm modal-text"><i class="fa-solid fa-angles-left"></i></button>' +
								'<p id="numsBuyToken" style="font-size: 14px;font-weight: 600;color: white;margin: auto;margin-left: 10px;margin-right: 10px;">'+pageNum+'</p>' +
								'<button id="PageRowUpBuyToken" onclick="UpBuyToken()" type="button" style="width:40px; background: #510EB2; color: white;display: inline-block;" class="btn btn-default btn-sm modal-text"><i class="fa-solid fa-angles-right"></i></button>' +
							'</div>' +
							'<div class="col-md-6 mb-3 d-inline-flex">' +
								'<input type="text" style="border-radius: 0;border-bottom-left-radius: 5px;border-top-left-radius: 5px; font-size:14px;" class="form-control" placeholder="Search" id="buyTokenKeyword">' +
								'<button onclick="buyTokenKeyword()" style="width:40px; background: #510EB2; color: white;display: inline-block;" class="btn btn-default btn-sm modal-text"><i class="fa-solid fa-magnifying-glass"></i></button>' +
							'</div>' +
							'<div class="col-md-12">' +
								'<table class="table">' +
									'<thead>' +
										'<tr>' +
											'<th style="width: 80px;">NFT</th>' +
											'<th>Marketplace Information</th>' +
											'<th>Link</th>' +
										'</tr>' +	
									'</thead>' +
									'<tbody id="buyTokenMarketplacesList">' +
									'</tbody>' +     
									'<tbody id="ten">' +
										'<tr>' +
											'<td colspan="4"><img src="https://image.admin.solutions/learn-more/0694191c-93ac-4c09-afc0-7118412b845e/5c0aaa7d-5501-457f-942a-28df48ae2b5a/c547086e-470a-4a90-9ebd-cc86e31e5616" width="50px" alt="Loading"></td>' +
										'</tr>' +
									'</tbody>' +         
								'</table>' +
							'</div>' +
						'</div>' +
					'</section>');	
				if(responseData["status"] == "good"){
					var htmlData = "";
					$.each(responseData["response"], function(i, val){
						if(checkIsValidFlag == false)
						{
							htmlData = htmlData + '<tr>'+
								'<td>'+val["nftName"]+'</td>' +
								'<td class="mpinformation">'+val["marketplaceName"]+"<hr>"+val["uri"]+'<span class="buyTokenCurrency">'+val["currencyName"]+'</span></td>' +
								'<td><a href="https://'+val["uri"]+'/'+val["marketplaceGUID"]+'?nft='+val["nftguid"]+'&currency='+val["currencyGUID"]+'" class="btn btn-md btnLink"><i class="fa-solid fa-link"></i></a></td>' +
								'</tr>';
						}
						if(checkIsValidFlag == true)
						{
							htmlData = htmlData + '<tr>'+
								'<td>'+val["nftName"]+'</td>' +
								'<td class="mpinformation">'+val["marketplaceName"]+"<hr>"+val["uri"]+'<span class="buyTokenCurrency">'+val["currencyName"]+'</span></td>' +
								'<td><a href="https://'+val["uri"]+'/'+val["marketplaceGUID"]+'?nft='+val["nftguid"]+'&currency='+val["currencyGUID"]+'&authToken='+parseLocalStorageAuthorizationToken+'&wallet='+window.location.pathname.substring(1)+'" class="btn btn-md btnLink"><i class="fa-solid fa-link"></i></a></td>' +
								'</tr>';
						}
					});
					$("#ten").css("display","none");
					$("#buyTokenMarketplacesList").html(htmlData);
					document.getElementById("buyTokenKeyword").value = keyword;
					var total = parseInt(responseData["total"]);
					var totals = 10 * pageNum;
					if (totals < total) {
						$('#PageRowUpBuyToken').attr('disabled', false);
						$('#PageRowDownBuyToken').attr('disabled', false);
					} else {
						$('#PageRowUpBuyToken').attr('disabled', true);
						$('#PageRowDownBuyToken').attr('disabled', false);
					};
					if (pageNum == 1) {
						$('#PageRowDownBuyToken').attr('disabled', true);
					}
					if(total == 0){
						$('#PageRowUpBuyToken').attr('disabled', true);
					}
				}
			}
	});	
}
function buyTokenKeyword(){
	var keyword = document.getElementById("buyTokenKeyword").value;
	var currency = "";
	var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
	var parseToken = JSON.parse(parseLocalStorageToken["value"]);
	var token = parseToken["Token"];	
	getListOfMarketplaces(keyword, currency, "1", "10")	
}
function DownBuyToken(){
	var pageNum = parseInt(document.getElementById("numsBuyToken").innerHTML);
	var keyword = document.getElementById("buyTokenKeyword").value;
	var currency = "";
	pageNum = pageNum - 1;
	$('#numsBuyToken').text(pageNum);
	$('#PageRowUpBuyToken').attr('disabled', true);
	$('#PageRowDownBuyToken').attr('disabled', true);
	$("tbody#buyTokenMarketplacesList").empty();
	keyword = keyword;
	getListOfMarketplaces(keyword, currency, pageNum, "10");
}
function UpBuyToken(){
	var pageNum = parseInt(document.getElementById("numsBuyToken").innerHTML);
	var keyword = document.getElementById("buyTokenKeyword").value;
	var currency = "";
	pageNum = pageNum + 1;
	$('#numsBuyToken').text(pageNum);
	$('#PageRowUpBuyToken').attr('disabled', true);
	$('#PageRowDownBuyToken').attr('disabled', true);
	var totals = "10" * pageNum;
	$("tbody#buyTokenMarketplacesList").empty();
	keyword = keyword;
	getListOfMarketplaces(keyword, currency, pageNum, "10");
}

function isValidChecking(guid,callback){
    if(typeof callback === 'function'){
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		var isval;
		$.ajax({
		    type: "POST",
		    contentType: 'application/json',
		    dataType: 'json',
		    url: 'https://website.admin.solutions/api/websiteapi/validation/isvalid',
		    data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"token\":\"" + guid + "\"}",
		    headers: {
		        "Content-type": "application/json", 
		        'Authorization': 'Bearer ' + token
		    },
		    success: function(responseData) {
		        isval = responseData;	
				if(isval == true){
					loginWalletStatus = true;
				}
				if($(".niftyMenuOpen").hasClass("niftyHide")){
					checkLoginStatus();
				}
		        callback(isval);
		    }
		});    	
    }
}


// End of Wallet Page



var nextM;
var netsongM;
var prevsongsM;
var prevM;
var nextplayM;
function pickSongM(num) {
    playStatusM(num);
    nextM = num;
    netsongM = num + 1;
    prevsongsM = num -1;
    nextSongM();
}
function nextSongM() {
    if(urls[nextM]!=undefined) {
        var audioPlayer = document.getElementsByName('audioM')[0];
        if(audioPlayer!=undefined) {
            audioPlayer.src=urls[nextM]["audio"];
            audioPlayer.load();
            audioPlayer.play();
            next++;
        } else {
            loadPlayerM();
        }
    } else {
        alert('the end!');
    }
}
function updateUI(){
	setInterval(function(){
		$('.progress .currentValue').css({ width: $('[name="audioM"]')[0].currentTime / $('[name="audioM"]')[0].duration * 100 + '%' });
	}, 1000/60);
}
function loadPlayerM() {
    var audioPlayer = new Audio();
    audioPlayer.controls="controls";
    audioPlayer.addEventListener('ended',nextSongM,false);
    audioPlayer.addEventListener('error',errorFallback,true);
    document.getElementById("player").appendChild(audioPlayer);
    nextSongM();
}
function errorFallbackM() {
	nextSongM();
}
function playStatusM(num){
    //$(".pickSong"+num+"").addClass("playing");
    $(".pickSong"+num).css("background-color", "rgba(78, 69, 227, 1)");
    if(prev != num){
        //$(".pickSong"+prevM+"").removeClass("playing");
        $(".pickSong"+prevM).css("background-color", "rgb(52 53 60)");
    } 
    prevM = num;
}
function nextpickSongM() {
    if(nextplayM >= netsongM) {
        playStatusM(netsongM);
        nextM = netsongM;
        netsongM = netsongM + 1;
        prevsongsM = netsongM -1;
        nextSongM();
    } else alert("No Next Song!")
}
function prevpickSongM() {
    if(prevsongsM >= 0){
        playStatusM(prevsongsM);
        nextM = prevsongsM;
        netsongM = prevsongsM + 1;
        prevsongsM = prevsongsM -1;
        nextSongM();
    } else alert("No Previous Song!")
}
function stopSongM() {
    var varAudio = document.getElementsByName('audioM')[0];
    varAudio.pause();
    varAudio.currentTime = 0;
}
function pauseSongM() {
	$(".play-B").show();
	$(".pause-B").hide();
    var varAudio = document.getElementsByName('audioM')[0];
    varAudio.pause();   
}
function playSongM() {
	$(".play-B").hide();
	$(".pause-B").show();
    var varAudio = document.getElementsByName('audioM')[0];
    varAudio.play();    
}
var retrivedObject = "";
var searchRetrivedObject = "";
var prev = -1;
var nextplay = 0;
function loadPlayer() {
    var audioPlayer = new Audio();
    audioPlayer.controls="controls";
    audioPlayer.addEventListener('ended',nextSong,false);
    audioPlayer.addEventListener('error',errorFallback,true);
    document.getElementById("player").appendChild(audioPlayer);
    nextSong();
}
function nextSong() {
    if(urls[next]!=undefined) {
        var audioPlayer = document.getElementsByTagName('audio')[0];
        if(audioPlayer!=undefined) {
            audioPlayer.src=urls[next]["audio"];
            audioPlayer.load();
            audioPlayer.play();
            next++;
        } else {
            loadPlayer();
        }
    } else {
        alert('the end!');
    }
}
function errorFallback() {
        nextSong();
}
function playPause() {
    var audioPlayer = document.getElementsByTagName('audio')[0];
    if(audioPlayer!=undefined) {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    } else {
        loadPlayer();
    }
}
function pickSong(num) {
    playStatus(num);
    next = num;
    netsong = num + 1;
    prevsongs = num -1
    nextSong();
}
function playStatus(num){
    //$(".pickSong"+num+" div").addClass("playing");
    $(".pickSong"+num).css("background-color", "rgba(78, 69, 227, 1)");
    if(prev != num){
        //$(".pickSong"+prev+" div").removeClass("playing");
        $(".pickSong"+prev).css("background-color", "rgb(108 104 104 / 30%)");
    } 
    prev = num;
}
function nextpickSong() {
    if(nextplay >= netsong) {
        playStatus(netsong);
        next = netsong;
        netsong = netsong + 1;
        prevsongs = netsong -1;
        nextSong();
    } else alert("No Next Song!")
}
function prevpickSong() {
    if(prevsongs >= 0){
        playStatus(prevsongs);
        next = prevsongs;
        netsong = prevsongs + 1;
        prevsongs = prevsongs -1;
        nextSong();
    } else alert("No Previous Song!")
}
function stopSong() {
    var varAudio = document.querySelector("#player > audio");
    varAudio.pause();
    varAudio.currentTime = 0;
}
function pauseSong() {
    var varAudio = document.querySelector("#player > audio");
    varAudio.pause();   
}
function playSong() {
    var varAudio = document.querySelector("#player > audio");
    varAudio.play();    
}
var urls = new Array();
var next = 0;
var netsong = 0,prevsongs = 0;

var current_page = 1;
var records_per_page = 40;

function prevPage(){
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}
function nextPage(){
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
function numPages(){
    var r = retrivedObject.length;
	
	var newi = 0;
	for(var i = 0; i < retrivedObject.length; i++)
	{
		var checkActive = "active";	
		if(retrivedObject[i].lbEnd != 0)
		{		
			checkActive = "inactive";
		}
		if($("#select_filter").val() == checkActive)
		{
			newi = newi+1;
		}		
	}
	
		
    if(document.getElementById('search-token-item').value != ""){
        r = searchRetrivedObject.length;
		
		var input, filter, data, i, txtValue, select_filter;
		select_filter 	= $("#select_filter").val();
		input  			= document.getElementById('search-token-item');
		filter 			= input.value.toUpperCase();
		object     		= retrivedObject;   		
		

		newi = 0;
		for(var ii = 0; ii < retrivedObject.length; ii++)
		{
			var checkActive = "active";	
			if(retrivedObject[ii].lbEnd != 0)
			{
				checkActive = "inactive";
			}
			if($("#select_filter").val() == checkActive)
			{
				txtValue = object[ii].nftname + " | " + object[ii].category + " | " + object[ii].rarity + " | " + object[ii].nfttokenname;
				var text = [object[ii].nftname, object[ii].category, object[ii].rarity, object[ii].nfttokenname];
				if(txtValue.match(filter))
				{
					newi = newi+1;
				}
			}
		}
    }
    
	r = newi;

    return Math.ceil(r / records_per_page);
}
function changePage(page){
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.querySelector("#TokenContainer .nftTokenList");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    var newHtmlDiv = "";
    var newTokenListArrayTemp = [];
    var newTokenListArray = [];
    if($("#search-token-item").val() == ""){
		
		for (var i = 0; i < retrivedObject.length; i++) {
			var checkActive = "active";
			if(retrivedObject[i].lbEnd != 0)
			{
				checkActive = "inactive";
			}
			
			if($("#select_filter").val() == checkActive)
			{			
				newTokenListArrayTemp.push({
					R1NameNFTToken: retrivedObject[i].nfttokenname,
					R1NameNFT: retrivedObject[i].nftname,
					Guid: retrivedObject[i].nftguid,
					Order: retrivedObject[i].Order,
					Blob: retrivedObject[i].image,
					Rarity: retrivedObject[i].rarity,
					Category: retrivedObject[i].category,
					BlockChain: retrivedObject[i].blockchain,
					Supply: retrivedObject[i].supply,
					Details: retrivedObject[i].details,
					CardDesign: retrivedObject[i].carddesign,
					//lbLentTo: retrivedObject[i].lbLentTo,
					//lbBorrowedFrom: retrivedObject[i].lbBorrowedFrom,
					lbLentStatus: retrivedObject[i].lbLentStatus,
					lbBorrowedStatus: retrivedObject[i].lbBorrowedStatus,
					lbStart: retrivedObject[i].lbStart,
					lbEnd: retrivedObject[i].lbEnd,
					lbNewLent: retrivedObject[i].lbNewLent,
					lbNewBorrowed: retrivedObject[i].lbNewBorrowed,
					lbBannerType: retrivedObject[i].lbBannerType,
					ownershipStart: retrivedObject[i].ownershipStart,
					ownershipEnd: retrivedObject[i].ownershipEnd,	
					//isActiveOwn: retrivedObject[i].isActiveOwn,					                		
				});	
			}			
		}
		
        for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < newTokenListArrayTemp.length; i++) {
				newTokenListArray.push({
					R1NameNFTToken: newTokenListArrayTemp[i].R1NameNFTToken,
					R1NameNFT: newTokenListArrayTemp[i].R1NameNFT,
					Guid: newTokenListArrayTemp[i].Guid,
					Order: newTokenListArrayTemp[i].Order,
					Blob: newTokenListArrayTemp[i].Blob,
					Rarity: newTokenListArrayTemp[i].Rarity,
					Category: newTokenListArrayTemp[i].Category,
					BlockChain: newTokenListArrayTemp[i].BlockChain,
					Supply: newTokenListArrayTemp[i].Supply,
					Details: newTokenListArrayTemp[i].Details,
					CardDesign: newTokenListArrayTemp[i].CardDesign,
					//lbLentTo: newTokenListArrayTemp[i].lbLentTo,
					//lbBorrowedFrom: newTokenListArrayTemp[i].lbBorrowedFrom,
					lbLentStatus: newTokenListArrayTemp[i].lbLentStatus,
					lbBorrowedStatus: newTokenListArrayTemp[i].lbBorrowedStatus,
					lbStart: newTokenListArrayTemp[i].lbStart,
					lbEnd: newTokenListArrayTemp[i].lbEnd,
					lbNewLent: newTokenListArrayTemp[i].lbNewLent,
					lbNewBorrowed: newTokenListArrayTemp[i].lbNewBorrowed,
					lbBannerType: newTokenListArrayTemp[i].lbBannerType,
					ownershipStart: newTokenListArrayTemp[i].ownershipStart,
					ownershipEnd: newTokenListArrayTemp[i].ownershipEnd,	
					//isActiveOwn: newTokenListArrayTemp[i].isActiveOwn,					                		
				});			
        }
    }else{
		for (var i = 0; i < searchRetrivedObject.length; i++) {
			var checkActive = "active";
			if(searchRetrivedObject[i].lbEnd != 0)
			{
				checkActive = "inactive";
			}
			
			if($("#select_filter").val() == checkActive)
			{			
				newTokenListArrayTemp.push({
					R1NameNFTToken: searchRetrivedObject[i].R1NameNFTToken,
					R1NameNFT: searchRetrivedObject[i].R1NameNFT,
					Guid: searchRetrivedObject[i].Guid,
					Order: searchRetrivedObject[i].Order,
					Blob: searchRetrivedObject[i].Blob,
					Rarity: searchRetrivedObject[i].Rarity,
					Category: searchRetrivedObject[i].Category,
					BlockChain: searchRetrivedObject[i].BlockChain,
					Supply: searchRetrivedObject[i].Supply,
					Details: searchRetrivedObject[i].Details,
					CardDesign: searchRetrivedObject[i].CardDesign,
					//lbLentTo: searchRetrivedObject[i].lbLentTo,
					//lbBorrowedFrom: searchRetrivedObject[i].lbBorrowedFrom,
					lbLentStatus: searchRetrivedObject[i].lbLentStatus,
					lbBorrowedStatus: searchRetrivedObject[i].lbBorrowedStatus,
					lbStart: searchRetrivedObject[i].lbStart,
					lbEnd: searchRetrivedObject[i].lbEnd,
					lbNewLent: searchRetrivedObject[i].lbNewLent,
					lbNewBorrowed: searchRetrivedObject[i].lbNewBorrowed,
					lbBannerType: searchRetrivedObject[i].lbBannerType,
					ownershipStart: searchRetrivedObject[i].ownershipStart,
					ownershipEnd: searchRetrivedObject[i].ownershipEnd,	
					//isActiveOwn: searchRetrivedObject[i].isActiveOwn,					                		
				});	
			}			
		}		
		
        for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < newTokenListArrayTemp.length; i++) {
            newTokenListArray.push({
                R1NameNFTToken: newTokenListArrayTemp[i].R1NameNFTToken,
                R1NameNFT: newTokenListArrayTemp[i].R1NameNFT,
                Guid: newTokenListArrayTemp[i].Guid,
                Order: newTokenListArrayTemp[i].Order,
                Blob: newTokenListArrayTemp[i].Blob,
                Rarity: newTokenListArrayTemp[i].Rarity,
                Category: newTokenListArrayTemp[i].Category,
                BlockChain: newTokenListArrayTemp[i].BlockChain,
                Supply: newTokenListArrayTemp[i].Supply,
                Details: newTokenListArrayTemp[i].Details,
                CardDesign: newTokenListArrayTemp[i].CardDesign,
                //lbLentTo: newTokenListArrayTemp[i].lbLentTo,
                //lbBorrowedFrom: newTokenListArrayTemp[i].lbBorrowedFrom,
                lbLentStatus: newTokenListArrayTemp[i].lbLentStatus,
                lbBorrowedStatus: newTokenListArrayTemp[i].lbBorrowedStatus,
                lbStart: newTokenListArrayTemp[i].lbStart,
                lbEnd: newTokenListArrayTemp[i].lbEnd,
                lbNewLent: newTokenListArrayTemp[i].lbNewLent,
                lbNewBorrowed: newTokenListArrayTemp[i].lbNewBorrowed,
                lbBannerType: newTokenListArrayTemp[i].lbBannerType,				
                ownershipStart: newTokenListArrayTemp[i].ownershipStart,
                ownershipEnd: newTokenListArrayTemp[i].ownershipEnd,	
				//isActiveOwn: newTokenListArrayTemp[i].isActiveOwn,					
            });
        }       
    }
	var oGuidIDAdder = 0;
    newTokenListArray.forEach(function(o) { 
	
		var now = new Date;
		var timestampUTCTemp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());	
		var timestampUTCString = timestampUTCTemp.toString();
		var timestampUTC = parseInt(timestampUTCString.substring(0, timestampUTCString.length-3));
	
        var newRarity = "";
        if (o.Rarity == undefined) {
            newRarity = "Default";
        } else {
            newRarity = o.Rarity.replaceAll(' ', '');
        }

        if ((o.Blob == undefined) || (o.Blob == "")) o.Blob = "https://dummyimage.com/250x350/000000/ffffff.png";
        if (o.Category == undefined) o.Category = "miscellaneous";
        if (o.SNPageURI == undefined || o.SNPageURI == null || o.SNPageURI == "") o.SNPageURI = "https://seemynft.page";

		var Filter = "";
		var LentBorrowCSS_1 = "";
		var LentBorrowCSS_2 = "";
		var LBBanner = "";
		var addCardOnClick = "";
		var isOnClick = true;
		
		if((o.lbNewBorrowed != "") || (o.lbNewLent != "")){
			LentBorrowCSS_1 = `style="position:relative;"`;			
			if(o.lbNewLent != ""){
				isOnClick = false;
				
				if(o.lbBannerType == "513711")
				{
					LBBanner = `<div class="lb-ribbon"><img src="https://image.admin.solutions/lent-banner/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/aca55d04-8ba2-4eda-8a57-a45a4270620a" style="width:258px;height:358px;"/></div>`;
				}
				else if(o.lbBannerType == "513712")
				{
					LBBanner = `<div class="lb-ribbon"><img src="https://image.admin.solutions/activated-banner/4cd91dae-d334-44b6-8312-1eb0955672ea/ffdbb226-c730-4205-8af6-71ad94873800/03fa6fa8-7ed7-4c69-b493-c0bce285a503" style="width:258px;height:358px;"/></div>`;
				}
				else
				{
					LBBanner = `<div class="lb-ribbon"><img src="https://image.admin.solutions/lent-banner/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/aca55d04-8ba2-4eda-8a57-a45a4270620a" style="width:258px;height:358px;cursor:pointer;"/></div>`;
				}
				
				LentBorrowCSS_2 = `filter: grayscale(1) contrast(0.8);`;
				addCardOnClick = `onclick="flipDetails('` + o.Guid + "_" + oGuidIDAdder + `')"`;
			}
			if(o.lbNewBorrowed != ""){
				if(o.lbBannerType == "513711")
				{
					LBBanner = `<div class="lb-ribbon"><img src="https://image.admin.solutions/borrowed-banner/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/254abc62-fa92-4f4f-8f91-3abf7821e4bd" style="width:258px;height:358px;cursor: pointer;"/></div>`;
				}
				else if(o.lbBannerType == "513712")
				{
					LBBanner = `<div class="lb-ribbon"><img src="https://image.admin.solutions/member-banner/4cd91dae-d334-44b6-8312-1eb0955672ea/ffdbb226-c730-4205-8af6-71ad94873800/abbe48e2-968a-4790-bce7-c984c8861665" style="width:258px;height:358px;cursor: pointer;"/></div>`;
				}
				else
				{
					LBBanner = `<div class="lb-ribbon"><img src="https://image.admin.solutions/borrowed-banner/141f6617-6095-43ee-bd53-44124cd7909e/b73c49c2-f723-454f-af07-9743478fc67f/254abc62-fa92-4f4f-8f91-3abf7821e4bd" style="width:258px;height:358px;cursor: pointer;"/></div>`;
				}				
				
				LentBorrowCSS_2 = "";
			}			
		}

		var isActiveOwnCSS = "";
		
		if(o.lbEnd != 0)
		{
			if(LentBorrowCSS_2 == "")
			{
				if(o.ownershipEnd != "")
				{
					isOnClick = false;
				}				
				isActiveOwnCSS = `filter: grayscale(1) contrast(0.8);`;
				addCardOnClick = `onclick="flipDetails('` + o.Guid + "_" + oGuidIDAdder + `')"`;
				Filter = Filter + "InActive";
			}			
		}				
		
		if(isOnClick)
		{
			addCardOnClick = `onclick="gotoNFT('` + o.SNPageURI + `','` + o.Guid + "_" + oGuidIDAdder + `')"`;
			Filter = Filter + "Active";
		}
		

		var StartDateLocal = "";
		var EndDateLocal = "";

		var unix_timestamp_start = parseInt(o.lbStart);
		var unix_timestamp_end = parseInt(o.lbEnd);
		if(unix_timestamp_start != 0)
		{				
			var unix_date = Date.parse(o.ownershipStart);
			var unix_dateString = unix_date.toString();
			unix_date = parseInt(unix_dateString.substring(0, unix_dateString.length-3));

			var date = new Date(unix_date * 1000);			
			//var date = new Date(unix_timestamp_start * 1000);
			const event = new Date(date + ' UTC');
			var options = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
			StartDateLocal = event.toLocaleString(navigator.language, options);			
		
		}
		if(unix_timestamp_end != 0)
		{
			var unix_date = Date.parse(o.ownershipEnd);
			var unix_dateString = unix_date.toString();
			unix_date = parseInt(unix_dateString.substring(0, unix_dateString.length-3));
			
			var date = new Date(unix_date * 1000);
			//var date = new Date(unix_timestamp_end * 1000);
			const event = new Date(date + ' UTC');
			var options = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
			EndDateLocal = event.toLocaleString(navigator.language, options);				
				
		}
		
		if(EndDateLocal == "")
		{
			EndDateLocal = "N/A";
		}
		
		
		
        if(o.CardDesign == "400002"){
                newHtmlDiv += `<div ` + addCardOnClick + ` id="flipdetails_` + o.Guid + "_" + oGuidIDAdder + `" data-attr="` + o.R1NameNFT + ` | ` + o.Category + ` | ` + newRarity + ` | ` + Filter + `" class="col-sm-3 col-md-3 col-lg-3" ` + LentBorrowCSS_1 + `>
								` + LBBanner + `
                                <div class="profile-card-2" data-nfttoken-guid="` + o.Guid + "_" + oGuidIDAdder + `" style="` + LentBorrowCSS_2 + isActiveOwnCSS + `">
									<div onclick="flipBackDetails('` + o.Guid + "_" + oGuidIDAdder + `')" id="flipBack_` + o.Guid + "_" + oGuidIDAdder + `" style="position: absolute;z-index:-1;background: rgb(23, 34, 48);border: 0px solid rgb(44, 56, 72);height: 100%;width: 100%;color:black;font-weight:700;opacity:0;border-radius: 10px;background: url('`+o.Blob+`') 0% 0% / cover no-repeat rgb(23, 34, 48);">
										<br>
										<center style="background: white;padding: 10px 0px;margin: 0px 20px;color: #4231c0;font-weight: bold;">Ownership Date</center>
										<center style="font-size:small;background: #ffffff;color: #4231c0;font-weight: 500;padding: 10px 0px;margin: 5px 20px;"><span style="font-weight: bold;">Start:</span> ` + StartDateLocal + `</center>										
										<center style="font-size:small;color: #4231c0;font-weight: 500;background: #ffffff;padding: 10px 0px;margin: 5px 20px;"><span style="font-weight: bold;">End:</span>` + EndDateLocal + `</center>
										<div class="profile-name-nft-token">` + o.R1NameNFTToken + `</div>
										<div class="profile-name-nft">
											<div class="div">
												<span class='span'>` + o.R1NameNFT + `</span>
											</div>
										</div>
										<div class="profile-guid">` + o.Guid + `</div>										
									</div>
                                    <img src="` + o.Blob + `" class="img img-responsive nft-cover" style="max-width: 100%;">
                                    <div class="profile-buttons">
                                        <div style="padding-bottom: 6px;" title="NFT Information" onclick="openModalToken('` + o.Guid + "_" + oGuidIDAdder + `')">
                                            <i class="fas fa-info-circle"></i>
                                        </div>
                                        <div title="NFT Link">
                                            <a style="color: #fff;padding-bottom: 6px;" target="_blank" href="` + o.SNPageURI + `/` + o.Guid + "_" + oGuidIDAdder + `">
                                                <i class="fas fa-external-link-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="profile-nft">
                                        NFT 
                                        <i title="` + o.Rarity + `" class="fas fa-star rarityColor` + newRarity + `" style="margin-left: 6px;font-size: 18px;"></i>
                                    </div>
                                    <div class="profile-nft-category">` + o.Category + `</div>
                                    <div class="profile-name-nft-token">` + o.R1NameNFTToken + `</div>
                                    <div class="profile-name-nft">
                                        <div class="div">
                                            <span class='span'>` + o.R1NameNFT + `</span>
                                        </div>
                                    </div>
                                    <div class="profile-guid">` + o.Guid + `</div>
                                </div>
                            </div>`;          
        }
		else if(o.CardDesign == "400003")
		{
                newHtmlDiv += `<div ` + addCardOnClick + ` id="flipdetails_` + o.Guid + "_" + oGuidIDAdder + `" data-attr="` + o.R1NameNFT + ` | ` + o.Category + ` | ` + newRarity + ` | ` + Filter + `" class="col-sm-3 col-md-3 col-lg-3" ` + LentBorrowCSS_1 + `>
								` + LBBanner + `
                                <div class="profile-card-2" data-nfttoken-guid="` + o.Guid + "_" + oGuidIDAdder + `" style="max-width: 100%;border-radius: 20px;padding: 0px 0px 0px 0px;min-height: inherit;height:inherit;max-height:inherit;` + LentBorrowCSS_2 + isActiveOwnCSS + `">
									<div onclick="flipBackDetails('` + o.Guid + "_" + oGuidIDAdder + `')" id="flipBack_` + o.Guid + "_" + oGuidIDAdder + `" style="position: absolute;z-index:-1;background: rgb(23, 34, 48);border: 1px solid rgb(44, 56, 72);height: 100%;width: 100%;color:black;font-weight:700;opacity:0;border-radius: 10px;">
										<br>
										<center style="background: white;padding: 10px 0px;margin: 0px 20px;color: #4231c0;font-weight: bold;">Ownership Date</center>
										<center style="font-size:small;background: #ffffff;color: #4231c0;font-weight: 500;padding: 10px 0px;margin: 5px 20px;"><span style="font-weight: bold;">Start:</span> ` + StartDateLocal + `</center>																				
										<center style="font-size:small;color: #4231c0;font-weight: 500;background: #ffffff;padding: 10px 0px;margin: 5px 20px;"><span style="font-weight: bold;">End:</span>` + EndDateLocal + `</center>
									</div>								
                                    <img src="` + o.Blob + `" class="img img-responsive nft-cover" style="max-width: 100%;border-radius: 20px;padding: 10px;">
                                    <div class="profile-nft-category-v2">` + o.Category + `</div>
                                    <div style="overflow:hidden;margin: 10px;">
                                        <div class="profile-name-nft-token-v2">`+ o.R1NameNFTToken +`</div>
                                        <div class="profile-name-nft-v2">` + o.R1NameNFT + `</div>
                                        <div style="display: flex;padding: 5px 0px;font-size: 12px;">
                                            <div class="rarityBorderColor`+ newRarity + `" style="color: white;padding: 3px 10px;border-radius: 10px;">`+ o.Rarity +`</div>
                                        </div>
                                        <div class="" style="display: flex;padding: 15px 0px 5px 0px;">
                                            <div style="width: 45%;border-radius: 2px;padding: 3px 10px;border: 1px solid white;color: white;text-align: center;font-weight: 500;" onclick="openModalToken('` + o.Guid + "_" + oGuidIDAdder + `')">Details</div>
                                            <div style="width: 10%;"></div>
                                            <div style="width: 45%;border-radius: 2px;padding: 3px 10px;border: 1px solid #4231c0;color: #4231c0;background: white;text-align: center;font-weight: 500;" target="_blank" href='` + o.SNPageURI + `/`+ o.Guid + "_" + oGuidIDAdder + `'>Link</div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;                 
        }
		else
		{
            newHtmlDiv += `<div ` + addCardOnClick + ` id="flipdetails_` + o.Guid + "_" + oGuidIDAdder + `" data-attr="` + o.R1NameNFT + ` | ` + o.Category + ` | ` + newRarity + ` | ` + Filter + `" class="col-sm-3 col-md-3 col-lg-3" ` + LentBorrowCSS_1 + `>
								` + LBBanner + `
                                <div class="profile-card-2" data-nfttoken-guid="` + o.Guid + "_" + oGuidIDAdder + `" style="` + LentBorrowCSS_2 + isActiveOwnCSS + `">
									<div onclick="flipBackDetails('` + o.Guid + "_" + oGuidIDAdder + `')" id="flipBack_` + o.Guid + "_" + oGuidIDAdder + `" style="position: absolute;z-index:-1;background: rgb(23, 34, 48);border: 1px solid rgb(44, 56, 72);height: 100%;width: 100%;color:black;font-weight:700;opacity:0;border-radius: 10px;">
										<br>
										<center style="background: white;padding: 10px 0px;margin: 0px 20px;color: #4231c0;font-weight: bold;">Ownership Date</center>										
										<center style="font-size:small;background: #ffffff;color: #4231c0;font-weight: 500;padding: 10px 0px;margin: 5px 20px;"><span style="font-weight: bold;">Start:</span> ` + StartDateLocal + `</center>																				
										<center style="font-size:small;color: #4231c0;font-weight: 500;background: #ffffff;padding: 10px 0px;margin: 5px 20px;"><span style="font-weight: bold;">End:</span>` + EndDateLocal + `</center>
									</div>
                                    <img src="` + o.Blob + `" class="img img-responsive nft-cover" style="max-width: 100%;">
                                    <div class="profile-buttons">
                                        <div style="padding-bottom: 6px;" title="NFT Information" onclick="openModalToken('` + o.Guid + "_" + oGuidIDAdder + `')">
                                            <i class="fas fa-info-circle"></i>
                                        </div>
                                        <div title="NFT Link">
                                            <a style="color: #fff;padding-bottom: 6px;" target="_blank" href="` + o.SNPageURI + `/` + o.Guid + "_" + oGuidIDAdder + `">
                                                <i class="fas fa-external-link-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="profile-nft">
                                        NFT 
                                        <i title="` + o.Rarity + `" class="fas fa-star rarityColor` + newRarity + `" style="margin-left: 6px;font-size: 18px;"></i>
                                    </div>
                                    <div class="profile-nft-category">` + o.Category + `</div>
                                    <div class="profile-name-nft-token">` + o.R1NameNFTToken + `</div>
                                    <div class="profile-name-nft">
                                        <div class="div">
                                            <span class='span'>` + o.R1NameNFT + `</span>
                                        </div>
                                    </div>
                                    <div class="profile-guid">` + o.Guid + "_" + oGuidIDAdder + `</div>
                                </div>
                            </div>`;                 
        }
		oGuidIDAdder++;
    }); 
    listing_table.innerHTML = newHtmlDiv;
	
    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.display = "none";
    } else {
        btn_prev.style.display = "initial";
    }

    if (page == numPages()) {
        btn_next.style.display = "none";
    } else {
        btn_next.style.display = "initial";
    }

}

function flipDetails(id){
  $('[data-nfttoken-guid='+id+']').animate({opacity: '5%'},{duration: 100, complete: function(){
		
		if($("#flipdetails_"+id+" > div.lb-ribbon > img"))
		{
			$("#flipdetails_"+id+" > div.lb-ribbon > img").css("display","none");
		}		
		
		var remove = document.getElementById("flipdetails_" + id);		
		remove.removeAttribute("onclick");
	  
		document.querySelector("#flipdetails_"+id+" > div.profile-card-2").animate([ 
			{ filter: 'grayscale(0) contrast(1)' } ], 	
			{ duration: 500, iterations: 1, fill: "forwards" }
		);
	
        $('[data-nfttoken-guid='+id+']').animate({opacity: '100%'}, {duration: 500, complete: function(){
			$( "#flipBack_" + id ).css("z-index", "1");
			$( "#flipBack_" + id ).css("opacity", "1");
		}}); 
		
    }});			
}

function flipBackDetails(id){
  //$('[data-nfttoken-guid='+id+']').animate({opacity: '5%'},{duration: 100, complete: function(){

		if($("#flipdetails_"+id+" > div.lb-ribbon > img"))
		{
			$("#flipdetails_"+id+" > div.lb-ribbon > img").css("display","block");
		}

		document.querySelector("#flipdetails_"+id+" > div.profile-card-2").animate([ 
			{ filter: 'grayscale(1) contrast(0.8)' } ], 	
			{ duration: 500, iterations: 1, fill: "forwards" }
		);
	
        $("#flipdetails_"+id+" > div.profile-card-2").animate({opacity: '100%'}, {duration: 100, complete: function(){
			$( "#flipBack_" + id ).css("z-index", "0");
			$( "#flipBack_" + id ).css("opacity", "0");
			var set = document.getElementById("flipdetails_" + id);
			set.setAttribute("onclick","flipDetails('" + id + "')");
		}}); 
		
    //}});			
}

$("#TokenContaineriframe").hide()
function gotoNFT(uri,guid){	
    
	var w = window.innerWidth;
	var guid_split = guid.split("_");
	
	if(w < 500){
		
		$("#TokenContaineriframe").show();		
		$("#TokenContaineriframe").html('<object data="'+uri + "/" + guid_split[0] +'">');
		window.location.hash = "#modalOpenTokens";
		
	} else {
		$('[data-nfttoken-guid='+guid+']').animate({opacity: '5%'},{duration: 100, complete: function(){
			window.location.href = uri +"/"+guid_split[0];
			$('[data-nfttoken-guid='+guid+']').animate({opacity: '50%'},1000);        
		}});	
	}
}

function searchToken() {
    searchRetrivedObject = [];
    var input, filter, data, i, txtValue, select_filter;
    select_filter 	= $("#select_filter").val();
	input  			= document.getElementById('search-token-item');
    filter 			= input.value.toUpperCase();
    object     		= retrivedObject;    
    
	
	for(i = 0; i < object.length; i++){
		
		var checkActive = "active";
		if(object[i].lbEnd != 0)
		{
			checkActive = "inactive";
		}
		
		if(select_filter == checkActive)
		{
			txtValue = object[i].nftname + " | " + object[i].category + " | " + object[i].rarity + " | " + object[i].nfttokenname;
			var text = [object[i].nftname, object[i].category, object[i].rarity, object[i].nfttokenname];
			if(txtValue.match(filter))
			{
				searchRetrivedObject.push({
					R1NameNFTToken: object[i].nfttokenname,
					R1NameNFT: object[i].nftname,
					Guid: object[i].nftguid,
					Order: object[i].Order,
					Blob: object[i].image,
					Rarity: object[i].rarity,
					Category: object[i].category,
					BlockChain: object[i].blockchain,
					Supply: object[i].supply,
					Details: object[i].details,
					CardDesign: object[i].carddesign,
					//lbLentTo: object[i].lbLentTo,
					//lbBorrowedFrom: object[i].lbBorrowedFrom,
					lbLentStatus: object[i].lbLentStatus,
					lbBorrowedStatus: object[i].lbBorrowedStatus,
					lbStart: object[i].lbStart,
					lbEnd: object[i].lbEnd,
					lbNewLent: object[i].lbNewLent,
					lbNewBorrowed: object[i].lbNewBorrowed,
					lbBannerType: object[i].lbBannerType,
					ownershipStart: object[i].ownershipStart,
					ownershipEnd: object[i].ownershipEnd,	
					//isActiveOwn: object[i].isActiveOwn,					
				});	
			}
		}
	}

    changePage(1);
}

function openModalToken(tokenguid) {
    clearModalValue("modalOpenModalToken");
    var finalTokenListArray = retrivedObject;
    finalTokenListArray.forEach(function (o) {
        if (o.nftguid == tokenguid) {
            // on cards
            $(".modalTokenImg img").attr("src", o.image);
            if ((o.image == undefined) || (o.image == "")) {
                $(".modalTokenImg img").attr("src", "https://dummyimage.com/250x350/000000/ffffff.png");
            }
            if (o.SNPageURI == undefined || o.SNPageURI == null || o.SNPageURI == "") o.SNPageURI = "https://seemynft.page";
            $(".modalNFTLink").attr("href", o.SNPageURI + "/" + o.nftguid);
            $(".modalTokenQR").attr("src", "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://staging.seemynft.page/" + o.nftguid + "&choe=UTF-8");
            $(".modalSeemynftpage").html("<a target=\"_blank\" href='" + o.SNPageURI + "/" + o.nftguid + "'\"><i class=\"fas fa-external-link-alt\"></i></a>");
            $(".modalNameNFTToken").html(o.nfttokenname);
            $(".modalNameNFT").html(o.nftname);
            $(".modalNFTGuid").html(o.nftguid);
            if (o.rarity == undefined) {
                newRarity = "Default";
            } else {
                newRarity = o.rarity.replaceAll(' ', '');
            }
            $(".modalTokenNFT").html("NFT <i class=\"fas fa-star rarityColor" + newRarity+"\" style=\"margin-left: 6px;font-size: 18px;\"></i>");

            // on modal
            $(".modalTokenCategory").html(o.category);
            if (o.category == undefined) { $(".modalTokenCategory").html("miscellaneous") };
            $(".modalNFTDescription").html(o.details);
            $(".modalNFTNumberOfToken").html(o.sntisnot);
            $(".modalNFTTotalSupply").html(o.supply);
            $(".modalNFTRarity").html(o.rarity);
            $(".modalNFTCategory").html(o.category);
        }
    });
    $('.modalOpenModalToken').modal('show');
}

function clearModalValue(modal) {
    if (modal == "modalOpenModalToken") {
        $(".modalTokenImg img").attr("src", "https://dummyimage.com/250x350/000000/ffffff.png");
        $(".modalNFTLink").attr("href", "");
        $(".modalTokenQR").html("");
        $(".modalSeemynftpage").html("");
        $(".modalTokenCategory").html("");
        $(".modalNameNFTToken").html("");
        $(".modalNameNFT").html("");
        $(".modalNFTGuid").html("");
        $(".modalNFTDescription").html("");
        $(".modalNFTNumberOfToken").html("No Serial Number!");
        $(".modalNFTTotalSupply").html("");
        $(".modalNFTRarity").html("");
        $(".modalNFTCategory").html("");
        $(".modalTokenNFT").html("NFT <i class=\"fas fa-star rarityColorDefault\" style=\"margin-left: 6px;font-size: 18px;\"></i>");
    }
}

$( window ).resize(function() {
    checkForChanges()
});

function checkForChanges() { // auto resize div
    var element = $(".nftTokenList");
    var lastWidth = $(".nftTokenList").css("width").slice(0, -2);

    if (lastWidth <= 1170 && lastWidth >= 1060) {
        $(".nftTokenList > div").attr("class", "");
        $("#modalCardWithHandler").val(lastWidth);
        if ($(".nftTokenList > div").attr("class") != "col-md-3") {
            $(".nftTokenList > div").attr("class", "col-md-3");
        }
    }
    if (lastWidth >= 785 && lastWidth <= 1059) {
        $(".nftTokenList > div").attr("class", "");
        $("#modalCardWithHandler").val(lastWidth);
        if ($(".nftTokenList > div").attr("class") != "col-md-4") {
            $(".nftTokenList > div").attr("class", "col-md-4");
        }

    }
    if (lastWidth >= 525 && lastWidth <= 784) {
        $(".nftTokenList > div").attr("class", "");
        $("#modalCardWithHandler").val(lastWidth);
        if ($(".nftTokenList > div").attr("class") != "col-md-6") {
            $(".nftTokenList > div").attr("class", "col-md-6");
        }
    }
    if (lastWidth <= 524) {
        $(".nftTokenList > div").attr("class", "");
        $("#modalCardWithHandler").val(lastWidth);
        if ($(".nftTokenList > div").attr("class") != "col-md-12") {
            $(".nftTokenList > div").attr("class", "col-md-12");
        }
    }
    if ($(".showhideSection .nftTokenList")[1] != undefined) {
        if (element.css('width') != lastWidth) {
            alert('xxx');
            lastwidth = element.css('width');
        }
    }
}
/* messaging */
    $( window ).resize(function() {
        var messageModal = $("#messageModal .modal-dialog").height() - 150
        $(".direct-chat-messages").css({"height": messageModal+"px"});
     });
    var status = false;
    var buyparams = {};
    function mobilemodalMessage() {
        $("#msgDataFull").empty();
        $("#mobilemodalMessage .modal-body").empty();
        $("#mobilemodalMessage").modal("toggle");
    }
    function formatDate(date) {
         var d = new Date(date),
             month = '' + (d.getMonth() + 1),
             day = '' + d.getDate(),
             year = d.getFullYear();

         if (month.length < 2) month = '0' + month;
         if (day.length < 2) day = '0' + day;

         return [month, day, year].join('/');
    }
    function closemessageModal() {
        $("#messageModal").hide();
    }
    function readmoremodalMessage() {
        $("#readmoremodalMessage").modal("toggle");
    }
    function ReadMoreMessage(id) {
        $("#readmoremodalMessage .modal-body").empty();
        $("#readmoremodalMessage").modal("toggle");
        buyparams.messageToken.map(function (items, index) {
            if(items.auxID == id) {     
                $("#readmoremodalMessage .modal-body").append(items.expandedText);
            }
        });
    }
    function VeiwAllDetails(id) {
        $("#msgDataFull").empty();
        $("#mobilemodalMessage .modal-body").empty();
        var windowsize= $( window ).width();

        if (windowsize > 575) {
            buyparams.messageToken.map(function (items, index) {
                if(items.auxID == id) {
                    let twofa = '<h1 class="text-center text-capitalize" style="margin-top: 10px;">' +
                                    items.title +
                                    '<br>' +
                                    '<hr style="width: 15%;margin: auto;border: 2px solid white;">' +
                                '</h1>' +
                                '<p class="text-center">Date Posted: '+formatDate(items.dateStart)+'</p>' +
                                '<br>' +
                                '<p class="text-center">'+items.text+'</p>';
                    if(items.expandedText != "") {
                         twofa += "<div class=\"text-end bln\"><button onclick=\"ReadMoreMessage('"+items.auxID+"')\">Read More...</button></div>";
                    }
                                
                $("#msgDataFull").append(twofa);
                }
            });
        } else {
            buyparams.messageToken.map(function (items, index) {
                if(items.auxID == id) {
                    let twofa = '<h1 class="text-center text-capitalize" style="margin-top: 10px;">' +
                                    items.title +
                                    '<br>' +
                                    '<hr style="width: 15%;margin: auto;border: 2px solid white;">' +
                                '</h1>' +
                                '<p class="text-center">Date Posted: '+formatDate(items.dateStart)+'</p>' +
                                '<br>' +
                                '<p class="text-center">'+items.text+'</p>';
                    if(items.expandedText != "") {
                         twofa += "<div class=\"text-end bln\"><button onclick=\"ReadMoreMessage('"+items.auxID+"')\">Read More...</button></div>";
                    }
                                
                $("#mobilemodalMessage .modal-body").append(twofa);
                }
            });
            $("#mobilemodalMessage").modal("toggle");
        }
    }

	// jimssell msgDataFull
	// $("#MobileMessagedetails").hide();
	function MobileMessageList(id) {
        $("#MobileMessagedetails .msg-body").empty();
		$(".nav-section").hide();
		$("#MobileMessageList").hide();
		$("#MobileMessagedetails").show();
		
		buyparams.messageToken.map(function (items, index) {
			if(items.auxID == id) {
				// console.log(items);
				let twofa = '<span class="date">Date Posted:'+ formatDate(items.dateStart) +'</span>' +
							'<h4>'+items.title+'</h4>';
							if(items.text != null){
								twofa += '<div>'+items.text+'</div>';
							};
							if(items.expandedText != "") {
								twofa += "<div class='text-end bln'><button onclick='ReadMoreMessage("+items.auxID+")'>Read More...</button></div>";
						   	}	 		
							$("#MobileMessagedetails .msg-body").append(twofa);
			}
		});
    }
	
	$('div#MsgClose').on('click', function() {
		MobileMessageList();
		$(".nav-section").show();
		console.log('test');
    });
	//ends
    function getval(sel) {
        $("#msgData").empty();
        $("#msgDataFull").empty();
		//jimssell
		$("#MobileMessageList").empty();
		$("#MobileMessagedetails").empty();
		//ends
		var w = window.innerWidth;
		if(w < 500){}
        var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
        var parseToken = JSON.parse(parseLocalStorageToken["value"]);
        var token = parseToken["Token"];
        var pmc = document.querySelector("meta[pagemonkeycode=pagemonkeycode-code]").getAttribute("content");
        var OrigAuxGUIDMessage = 0;
        if(sel.value == '0') {
            OrigAuxGUIDMessage = 0;
        }
        else if(sel.value == '1') {
           OrigAuxGUIDMessage = 1;
        }
        else if(sel.value == '2') {
            OrigAuxGUIDMessage = 2;
        }
        const params = {
            PMC: pmc,
            status: status,
            OrigAuxGUIDMessage: OrigAuxGUIDMessage
        };

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(params),
            url: 'https://website.admin.solutions/api/nftmessaging/message-list-wallet',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            },
            success: function (responseData) {
                if (responseData.messageToken == []) {
                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: "There's no messages"
                    });
                } else {
                    buyparams.messageToken = responseData.messageToken;
					if (MessageActivationDetails){
						putmessageMobile(responseData.messageToken)
					}else{
						putmessage(responseData.messageToken)
					}

                   
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                swal({
                    title: "Token Has Expired",
                        // text: errorThrown,
                    text: "Kindly refresh the page",
                    icon: "error"
                })
            }
        }); 
    }
    function putmessage(data) {
        $("#msgData").empty();
        data.map(function (items, index) {
            var twofa = `<a class="list-group-item list-group-item-action d-flex" onclick="VeiwAllDetails(`+items.auxID+`)">
                            <div class="box" style="margin-right: 5px;width: 20%;">
                                <div class="image"> 
                                    <img src="https://image.admin.solutions/token-img/0c9bb490-febd-4b0c-8905-3df40e529099/`+ items.nftguid + `/` + items.originalAuxNFTCardGUID +`" width="auto" height="13px" style="height: auto;width: 100%;"> 
                                </div>
                                <!-- <div class="online"></div> -->
                            </div>
                            <div class="d-flex align-items-start  m-auto" style="width: 80%;">
                                <div class="flex-grow-1 ml-3 text-capitalize">`  
                                    + items.title +
                                `</div>
                            </div>
                        </a>`;
            $("#msgData").append(twofa);
        });
    }
	// jimssell
    function putmessageMobile(data) {
        $("#MobileMessageList").empty();
        data.map(function (items, index) {
            var twofa = `<section class="items-body-content">
							<a href="#modalOpenMessage" onclick="MobileMessageList(`+items.auxID+`)">
								<div class="media">
									<div class="media-left">
										
										<img src="https://image.admin.solutions/token-img/0c9bb490-febd-4b0c-8905-3df40e529099/`+ items.nftguid + `/` + items.originalAuxNFTCardGUID +`"> 
										
									</div>
									<div class="media-body">
										<p>`+ items.title +`</p>                            
									</div>
								</div>								
							</a>
						</section>`;
								// <i class="fa fa-angle-right"></i>
            $("#MobileMessageList").append(twofa);
        });
    }	


	//jimssell
	var MessageActivation = false;
	var MessageActivationDetails = false;

	//jimssell
    $(document).ready(function(){
        $('select option[value="0"]').attr("selected",true);

        $('div#MPMessage').on('click', function() {
			MessageActivation = false;
            $("#messageModal").modal("toggle");
            var getURL = window.location.href;
            var splitURL = getURL.split("/");
            buyparams.wallet = splitURL[3].substring(0,36);
            //buyparams.wallet = '433e87da-04b6-4a1a-8cc6-c6220e4ccf0d';
            var timeleft = 10;
            var refreshIntervalId = setInterval(function() {
                if (timeleft <= 0) {
                    clearInterval(refreshIntervalId);
                } else {
                    var messageModal = $("#messageModal .modal-dialog").height() - 150
                    $(".direct-chat-messages").css({"height": messageModal+"px"});
                }
                timeleft -= 1;
            }, 100);
			// jimssell
			// wallet-verification
			walletverification(0);

        });
		// jimssell
		$('#Mmessage').on('click', function(){
			MessageActivation = true;
            var getURL = window.location.href;
            var splitURL = getURL.split("/");
            buyparams.wallet = splitURL[3].substring(0,36);
			// jimssell
			// wallet-verification
			walletverification(0);
		});
		
		$("#select_filter").on("change",function(){
			searchToken();
			current_page = 1;
		});
		$('#exampleModalFullscreenLabel').click(function() {
			$(".token-nav").show();            	
			$(".m-balance ").hide();
			window.location.hash = "#modalClosedMenu";
		})		
    })

	// jimssell
	function walletverification(sel){

		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
		var parseToken = JSON.parse(parseLocalStorageToken["value"]);
		var token = parseToken["Token"];
		var pmc = document.querySelector("meta[pagemonkeycode=pagemonkeycode-code]").getAttribute("content");
		OrigAuxGUIDMessage = 0;
		$("#myInput").val("");
		
		if(sel == '0') {
            OrigAuxGUIDMessage = 0;
        }
        else if(sel == '1') {
           OrigAuxGUIDMessage = 1;
        }
        else if(sel == '2') {
            OrigAuxGUIDMessage = 2;
        }
		const params = {
			PMC: pmc,
			status: status,
			OrigAuxGUIDMessage: OrigAuxGUIDMessage,
		};
		
		// wallet-verification
		$.ajax({
			type: "POST",
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(params),
			url: 'https://website.admin.solutions/api/nftmessaging/message-list-wallet',
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + token
			},
			success: function (responseData) {
				if (responseData.messageToken == []) {
					swal({
						icon: 'error',
						title: 'Oops...',
						text: "There's no messages"
					});
				} else {
					buyparams.messageToken = responseData.messageToken;
					if(MessageActivation){
						putmessageMobile(responseData.messageToken)
					}else{
						putmessage(responseData.messageToken)
					}
					
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				swal({
					title: "Token Has Expired",
					// text: errorThrown,
					text: "Kindly refresh the page",
					icon: "error"
				})
			}
		});	
		
		
	}

    function valid() {
        var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
        var parseToken = JSON.parse(parseLocalStorageToken["value"]);
        var token = parseToken["Token"];
        var pmc = document.querySelector("meta[pagemonkeycode=pagemonkeycode-code]").getAttribute("content");

        var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
		buyparams.niftyID = "17177fea-c7ac-45f6-8a5e-af88a1ed0b07";
		buyparams.niftyType = "Manage Message/View Private Message";

        isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
        	if(isdone){
        		$("#fulmodalwallet .modal-body").empty();
        		$("#fulmodalwallet").modal("show");
        		console.log();
        		 $.ajax({
					type: "POST",
					contentType: 'application/json',
					dataType: 'json',
					url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
					data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\"105611\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ buyparams.niftyID +"\"}",
					headers: {
						"Content-type": "application/json", 
						'Authorization': 'Bearer ' + token
					},
					success: function(responseData) {
						if(responseData["status"] == "Good")
						{
							
							$("#fulmodalwallet .modal-body").html(`<iframe id="IframeLink" src="" height="200" width="300" title="Iframe Example" style="width:100%;height:91vh"></iframe>`);
							$('#IframeLink').attr('src', responseData["response"]);
							$("#exampleModalToggle").modal('hide');
						} else {
							swal({
		                        title: "Incorrect",
		                        text: "Incorrect request!",
		                        icon: "error"
		                    })
						}
					}
				});
        	}
        	if(!isdone){
        		//2fa
		        const paramsfa = {
		            WalletGUID: buyparams.wallet,
		        };

		        $.ajax({
		            type: "POST",
		            contentType: 'application/json',
		            dataType: 'json',
		            data: JSON.stringify(paramsfa),
		            url: 'https://website.admin.solutions/api/nftmessaging/list-of-2fa-nft-wallet',
		            headers: {
		                "Content-type": "application/json",
		                "Authorization": "Bearer " + token
		            },
		            success: function (responseData) {
		                twofafunction(responseData)
		            },
		            error: function (XMLHttpRequest, textStatus, errorThrown) {
		                swal({
		                    title: "Invalid Wallet ID",
		                    text: "",
		                    icon: "error"
		                })
		                $("#walletIdSbmt").removeAttr("disabled");
		            }
		        });	
        	}
        });

        
    }
    function twofafunction(param) {
        $("#listtwofa").empty();
        let twoFAlist = param;
        $('#WalletIDfrom2FA').text(twoFAlist.wallet);
        twoFAlist.ecommerce2FAList.map(function (items, index) {
            let twofa = '<div class="form-check">'
                + '<input class="form-check-input" onchange="" type="radio" value="' + items.type + '" name="twofaaddress" id="twofaaddress' + index + '">'
                + '<label class="form-check-label text-white" for="twofaaddress' + index + '" style="color: black;">' + items.address + '</label>'
                + '</div>';
            $("#listtwofa").append(twofa);

            $("#WalletIDfrom2FA").html(buyparams.wallet)

        });
        $("#walletIdSbmt").removeAttr("disabled");
        $('#inputwalletId').modal("hide");
        $("#twofamodal").modal("show");
    }
    function confirm2FA() {
    	var parseLocalStorageAuthorizationToken = localStorage.getItem('AuthorizationToken');
		var parseLocalStorageToken = JSON.parse(localStorage.getItem('user_token'));
        var parseToken = JSON.parse(parseLocalStorageToken["value"]);
        var token = parseToken["Token"];
        var pmc = document.querySelector("meta[pagemonkeycode=pagemonkeycode-code]").getAttribute("content");
        $.each($("input[name='twofaaddress']:checked"), function () {
            buyparams.type = $(this).val();
        });
		buyparams.niftyID = "17177fea-c7ac-45f6-8a5e-af88a1ed0b07";
		buyparams.niftyType = "Manage Message/View Private Message";
        isValidChecking(parseLocalStorageAuthorizationToken, function(isdone){
        	if(isdone){
        		console.log();
        		 $.ajax({
					type: "POST",
					contentType: 'application/json',
					dataType: 'json',
					url: 'https://website.admin.solutions/api/nft/confirm/two-factor-authentication-code',
					data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\""+buyparams.type+"\",\"authorizationtoken\":\""+ parseLocalStorageAuthorizationToken +"\",\"action\":\""+ buyparams.niftyID +"\"}",
					headers: {
						"Content-type": "application/json", 
						'Authorization': 'Bearer ' + token
					},
					success: function(responseData) {
						if(responseData["status"] == "Good")
						{
							$("#twofamodal").modal("hide");
							$("#messageModal").modal("hide");
							$("#H2fa-body-title").html(buyparams.niftyType)
							$(".modalOpenModal2fa").modal("show");

							// <span class="lds-ripple"><div></div><div></div></span>
							// $("#H2fa-container").html(`<center><button class="btn" onclick="openNifty('`+responseData["response"]+`')">Open `+buyparams.niftyType+`</button><br><i style="">Successfully authorized you can now click the button to open the link!</i></center>`);
							$("#H2fa-action").html("");
						} else {
							swal({
		                        title: "Incorrect",
		                        text: "Incorrect request!",
		                        icon: "error"
		                    })
						}
					}
				});
        	}
        	if(!isdone){
        		var status = "bad";
				$.ajax({
				    type: "POST",
				    contentType: 'application/json',
				    dataType: 'json',
				    url: 'https://website.admin.solutions/api/websiteapi/validation/authorize-request',
				    data: "{\"pmc\":\"" + $('meta[pagemonkeycode=pagemonkeycode-code]').attr('content') + "\",\"type\":\""+buyparams.type+"\",\"input\":\""+$("#InputIDfrom2FA").val()+"\",\"action\":\""+buyparams.niftyID+"\"}",
				    headers: {
				        "Content-type": "application/json", 
				        'Authorization': 'Bearer ' + token
				    },
				    success: function(responseData) {
				        console.log(responseData);
				        localStorage.setItem('AuthorizationToken', responseData);
				       
				        if(responseData == "Invalid request! Please contact admin for help!")
						{
							swal({
		                        title: "Incorrect",
		                        text: "Incorrect request!",
		                        icon: "error"
		                    })				
						}
						if(responseData != "Invalid request! Please contact admin for help!") {
							$("#twofamodal").modal("hide");
							$("#messageModal").modal("hide");
							$("#inputAddress").html("We just sent it to "+ $("#InputIDfrom2FA").val());
							TIMELIMIT();
						}
						$("#confirm2fBtn").attr("disabled", false);
		                
				    }
				});	
        	}
        });
    }
/* end messaging*/

function openNifty(link){
	window.location.href = link;
}

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 60;
const ALERT_THRESHOLD = 30;

const COLOR_CODES = {
  info: {
    color: "blue"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

var TIME_LIMIT = 120;
var timePassed = 0;
var timeLeft = TIME_LIMIT;
var timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

function appsd() {
    document.getElementById("app").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
    </div>
    `;
}


//startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
function myFunction() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("mobile-msg");
	tr = table.getElementsByTagName("section");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("p")[0];
		if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}
		}       
	}
} 