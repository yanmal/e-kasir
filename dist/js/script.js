$('#menu').select2({
	data: daftar_menu,
	theme: 'bootstrap4'
});

$('#menu').change(function() {
	let harga = parseInt($(this).val());
	$('#harga').val(harga);
});


var awal = 0;
var total = 0;
// var pendapatan = (sessionStorage.pendapatan !== 0 || sessionStorage.pendapatan !== '') ? sessionStorage.pendapatan : 0;
// var pendapatan = 0;

$('#pendapatan').text(sessionStorage.pendapatan);

$('#add').click(function() {
	var menu = $('#menu').find(":selected").text();
	var harga = $('#harga').val();
	var qty = $('#qty').val();
	var no = parseInt(awal) + 1;
	var subTotal = harga*qty;

	if (qty == '' || qty == 0 || harga == '' || menu == 'Pilih') {
		alert('Data pembelian tidak boleh ada yang kosong.\nCek Menu, Qty atau Harga. Pastikan tidak ada yang kosong.');
	} else {
		$('#pesanan').append(`
			<tr>
			<td>` + no + `</td>
			<td>` + menu + `</td>
			<td>` + harga + `</td>
			<td>` + qty + `</td>
			<td><span class="badge badge-dark text-white">Rp. `+ subTotal +`</span></td>
			</tr>`);
		awal = no;
		total += subTotal;
		// console.log
		$('#total').text('Total = Rp. '+total);
		$('.modal-title').text('Total Bayar = Rp. '+total);
	}
});

$('#bayar').keyup(function() {
	var bayar = $(this).val();
	var jml_kembali = parseInt(bayar-total);
	// var kembalian = $('#kembalian').val();

	if (bayar == parseInt(total)) {
		$('#kembalian').text('Uang Pas');
	} else {
		$('#kembalian').text('Rp ' + jml_kembali);
	}
});

$('#reset').click(function() {
	$('#pesanan').children().remove();
	$('#harga').val('');
	$('#qty').val(0);
	$('#kembalian').text('');
	$('#bayar').val('');
	$('#total').text('');
	$('.modal-title').text('Total Bayar = 0');
	$('#menu').val('Pilih').trigger('change');
	var pendapatan = 0;
	if (sessionStorage.length == 0) {
		sessionStorage.setItem('pendapatan', pendapatan += total);
	} else {
		pendapatan = parseInt(sessionStorage.pendapatan);
		sessionStorage.setItem('pendapatan',  pendapatan += total);
	}
	// console.log(sessionStorage.getItem('pendapatan'));
	$('#pendapatan').text(sessionStorage.pendapatan);
	awal = 0;
	total = 0;
});