import React from 'react';
import { InputGroup, InputGroupAddon, Input, Row, Col, Container, FormGroup, Label, InputGroupText } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            a: 0,
            b: 0,
            P_m: 0,
            isPaint: false,
            grav_price: 0,
            rez_price: 0,
            matherialName: '',
            S_gr: 0,
            discount: 0,
            L_rez: 0,
            urgently: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: Number(value)
        });

        if (name === 'P_m') {
            this.setState({
                matherialName: event.target.attributes.getNamedItem('data-key').value
            });
        }
    }

    getMatherials = (matherials) => {
        let matherials_list = [];

        for (let key in matherials) {
            matherials_list.push(<FormGroup className='mb-2' key={key} check>
                <Label check>
                    <Input key={key} data-key={key} type="radio" value={matherials[key]} name="P_m" onChange={this.handleChange} />{' '}
                    {key}</Label>
            </FormGroup>)
        }
        return matherials_list;
    }

    getGrav_price = (grav_prices, matherials) => {
        for (let price in grav_prices) {
            if ((this.state.matherialName).indexOf(price) !== -1) {
                return grav_prices[price]
            }
        }
        return -1
    }

    getRez_price = (rez_prices, matherials) => {
        for (let price in rez_prices) {
            if ((this.state.matherialName).indexOf(price) !== -1) {
                return rez_prices[price]
            }
        }
        return -1
    }

    getDiscountValue = () => {
        return precisionRound(((this.getMatherialPrice() +
            this.getRezPrice() +
            this.getGravPrice() +
            this.getPaintingPrice()) * this.state.discount) / 100, 2)
    }

    getUrgentPrice = () => {
        return precisionRound(((this.getMatherialPrice() +
            this.getRezPrice() +
            this.getGravPrice() +
            this.getPaintingPrice()) * this.state.urgently) / 100, 2)
    }

    getMatherialPrice = () => precisionRound(this.state.a * this.state.b * this.state.P_m, 2);

    getMatherialSquare = () => precisionRound(this.state.a * this.state.b, 3);

    getRezPrice = () => (this.getRez_price(this.props.data.rez_prices, this.props.data.matherials) === -1) ? 0 : precisionRound(this.getRez_price(this.props.data.rez_prices, this.props.data.matherials) * this.state.L_rez, 2);

    getGravPrice = () => (this.getGrav_price(this.props.data.grav_prices, this.props.data.matherials) === -1) ? 0 : precisionRound(this.getGrav_price(this.props.data.grav_prices, this.props.data.matherials) * this.state.S_gr, 2);

    getPaintingPrice = () => (this.state.isPaint) ? precisionRound(this.state.a * this.state.b * this.props.data.painting, 2) : 0;


    render() {
        let { discount, urgently, matherials } = this.props.data;

        return (
            <Container fluid>
                <Row>
                    <Col sm='6'>
                        <h3 className='mt-3'>Параметры материала</h3>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Длинна реза</Label>
                            <InputGroup size="sm">
                                <Input placeholder="0" type="number" step="0.01" min='0' name='L_rez' onChange={this.handleChange} />
                                <InputGroupAddon addonType="append">м/п</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Площадь фигуры, м<sup>2</sup></Label>
                            <InputGroup size="sm">
                                <Input placeholder="0" type="number" step="0.01" min='0' name='a' onChange={this.handleChange} />
                                <Input placeholder="0" type="number" step="0.01" min='0' name='b' onChange={this.handleChange} />
                                <InputGroupAddon addonType="append">м.</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Площадь гравировки</Label>
                            <InputGroup size="sm">
                                <Input placeholder="0" type="number" step="1" min='0' name='S_gr' onChange={this.handleChange} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>см<sup>2</sup></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col sm='6' md='3' className='border- border-light'>
                        <h3 className='mt-3'>Материал</h3>
                        {this.getMatherials(matherials)}
                    </Col>
                    <Col sm='12' className='border-top border-light my-3 d-lg-none'></Col>
                    <Col lg='3' className='order-3 order-lg-1'>
                        <h3 className='mt-3'>Результат</h3>
                        <div>
                            <Label>Площадь материала:&nbsp;</Label><Label className='fw-900'>{this.getMatherialSquare()}</Label><Label className='fw-900'>м<sup>2</sup></Label>
                        </div>
                        <div>
                            <Label>Цена материала:&nbsp;</Label><Label className='fw-900'>{this.getMatherialPrice()}</Label><Label className='fw-900'>грн.</Label>
                        </div>
                        <div>
                            <Label>Цена резки:&nbsp;</Label><Label className='fw-900'>{this.getRezPrice()}</Label><Label className='fw-900'>грн.</Label>
                        </div>
                        <div>
                            <Label>Цена гравировки:&nbsp;</Label><Label className='fw-900'>{this.getGravPrice()}</Label><Label className='fw-900'>грн.</Label>
                        </div>
                        <div>
                            <Label>Скидка ({this.state.discount}%):&nbsp;</Label><Label className='fw-900'>{this.getDiscountValue()}</Label><Label className='fw-900'>грн.</Label>
                        </div>
                        <div>
                            <Label>Цена покраски:&nbsp;</Label><Label className='fw-900'>{this.getPaintingPrice()}</Label><Label className='fw-900'>грн.</Label>
                        </div>
                        <div>
                            <Label>Срочность:&nbsp;</Label><Label className='fw-900'>{this.getUrgentPrice()}</Label><Label className='fw-900'>грн.</Label>
                        </div>
                        <div className='mt-2'>
                            <h6>Итого:&nbsp;<span>
                                {precisionRound(
                                    this.getMatherialPrice() +
                                    this.getRezPrice() +
                                    this.getGravPrice() +
                                    this.getPaintingPrice() -
                                    this.getDiscountValue() +
                                    this.getUrgentPrice(),
                                    2)
                                }
                            </span><span>грн.</span></h6>
                        </div>
                    </Col>
                    <Col sm='12' className='border-top border-light my-3 order-2'></Col>
                    <Col sm='6' className='order-1 order-lg-3'>
                        <FormGroup>
                            <h3 className=''>Дополнительные опции</h3>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Покраска</Label>
                            <Input bsSize="sm" type="select" value={this.state.isPaint} id="exampleSelect" name='isPaint' onChange={this.handleChange}>
                                <option value={0}>Нет</option>
                                <option value={1}>Да</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Скидка</Label>
                            <Input bsSize="sm" type="select" name="discount" onChange={this.handleChange}>
                                {getDiscount(discount)}
                            </Input>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Срочный заказ</Label>
                            <Input bsSize="sm" type="select" name="urgently" onChange={this.handleChange}>
                                <option value='0'>Нет</option>
                                <option value={urgently}>Да</option>
                            </Input>
                        </FormGroup>
                    </Col>


                </Row>
            </Container>
        );
    }
}

const getDiscount = (discount) => {
    let options = [];

    for (let key in discount) {
        options.push(<option value={discount[key]} key={key} >{key}</option>)
    }
    return options;
}




function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}




export default ModalExample;